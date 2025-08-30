import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import fs from 'fs/promises';
import path from 'path';

// Haversine formula to calculate distance in km
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Analyzes a row from the CSV to produce a score and structured metrics
const analyzeRow = (row: any) => {
    let score = 0;
    const metrics: {icon: string, label: string, value: string, unit: string}[] = [];
    const weights = {
        'Solar_Irradiance_kWh/m²/day': 0.5,
        'Wind_Speed_m/s': 0.4,
        'Hydrogen_Production_kg/day': 0.1,
    };

    const solar = parseFloat(row['Solar_Irradiance_kWh/m²/day']);
    if (!isNaN(solar)) { score += solar * weights['Solar_Irradiance_kWh/m²/day']; metrics.push({ icon: '☀️', label: 'Solar Irradiance', value: solar.toFixed(2), unit: 'kWh/m²/day' }); }

    const wind = parseFloat(row['Wind_Speed_m/s']);
    if(!isNaN(wind)) { score += wind * weights['Wind_Speed_m/s']; metrics.push({ icon: '💨', label: 'Wind Speed', value: wind.toFixed(2), unit: 'm/s' }); }

    const hydrogen = parseFloat(row['Hydrogen_Production_kg/day']);
    if(!isNaN(hydrogen)) { score += hydrogen * weights['Hydrogen_Production_kg/day']; metrics.push({ icon: '💧', label: 'Est. H2 Production', value: hydrogen.toFixed(2), unit: 'kg/day' }); }

    return { score: Math.round(score * 10) / 10, metrics, name: row.City, location: { lat: parseFloat(row.Latitude), lng: parseFloat(row.Longitude) } };
};

export async function POST(req: NextRequest) {
  try {
    const { latitude, longitude } = await req.json();
    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json({ success: false, message: 'Invalid coordinates.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'main_dataset.csv');
    const csvFileContent = await fs.readFile(filePath, 'utf8');
    const parsedData = Papa.parse(csvFileContent, { header: true, skipEmptyLines: true });

    let closestSiteRow: any = null;
    let minDistance = Infinity;
    let bestSiteRow: any = null;
    let maxScore = -Infinity;

    // In a single pass, find both the closest site and the best site
    for (const row of parsedData.data as any[]) {
      // Find closest by distance
      const lat = parseFloat(row.Latitude);
      const lng = parseFloat(row.Longitude);
      if (isNaN(lat) || isNaN(lng)) continue;
      const distance = getDistance(latitude, longitude, lat, lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestSiteRow = row;
      }
      // Find best by score
      const { score } = analyzeRow(row);
      if (score > maxScore) {
        maxScore = score;
        bestSiteRow = row;
      }
    }

    if (!closestSiteRow || !bestSiteRow) {
      throw new Error('Could not find suitable locations to compare.');
    }

    const OPTIMAL_THRESHOLD_KM = 50;
    const isOptimal = minDistance <= OPTIMAL_THRESHOLD_KM;

    const userAssetProxyAnalysis = analyzeRow(closestSiteRow);
    const bestSiteAnalysis = analyzeRow(bestSiteRow);

    const result = {
      isOptimal,
      userAssetProxyAnalysis: { ...userAssetProxyAnalysis, distance: Math.round(minDistance) },
      bestSiteAnalysis,
    };

    return NextResponse.json({ success: true, data: result }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Comparison API Error' }, { status: 500 });
  }
}