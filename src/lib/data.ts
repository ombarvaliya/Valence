import { unstable_noStore as noStore } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Asset, { IAsset } from '@/models/Asset';
import Papa from 'papaparse';
import fs from 'fs/promises';
import path from 'path';

// --- Function to get the logged-in user's assets ---
export async function getUserAssets(userId: string): Promise<IAsset[]> {
  noStore(); 
  try {
    await dbConnect();
    const assets = await Asset.find({ userId: userId });
    return JSON.parse(JSON.stringify(assets));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user assets.');
  }
}

// --- THIS IS THE CORRECTED SCORING FUNCTION ---
const calculateScore = (row: any) => {
    let score = 0;
    const reasons: string[] = [];
    const weights = {
        'Solar_Irradiance_kWh/m²/day': 0.5,
        'Wind_Speed_m/s': 0.4,
        'Hydrogen_Production_kg/day': 0.1,
    };

    const solar = parseFloat(row['Solar_Irradiance_kWh/m²/day']);
    if (!isNaN(solar)) {
        score += solar * weights['Solar_Irradiance_kWh/m²/day'];
        reasons.push(`☀️ Solar Irradiance: ${solar.toFixed(2)} kWh/m²/day`);
    }
    const wind = parseFloat(row['Wind_Speed_m/s']);
    if(!isNaN(wind)) {
        score += wind * weights['Wind_Speed_m/s'];
        reasons.push(`💨 Wind Speed: ${wind.toFixed(2)} m/s`);
    }
    const hydrogen = parseFloat(row['Hydrogen_Production_kg/day']);
    if(!isNaN(hydrogen)) {
        score += hydrogen * weights['Hydrogen_Production_kg/day'];
        reasons.push(`💧 Hydrogen Production: ${hydrogen.toFixed(2)} kg/day`);
    }
    reasons.push(`📊 Original Feasibility Score: ${row.Feasibility_Score}`);

    return { score: Math.round(score * 10) / 10, reasons };
};

// --- Function to get and analyze the built-in dataset ---
export async function getOptimizedSites() {
  noStore();
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'main_dataset.csv');
    const csvFileContent = await fs.readFile(filePath, 'utf8');
    const parsedData = Papa.parse(csvFileContent, { header: true, skipEmptyLines: true });

    const scoredResults = parsedData.data.map((row: any) => {
        const lat = parseFloat(row.Latitude);
        const lng = parseFloat(row.Longitude);
        if (isNaN(lat) || isNaN(lng)) return null;

        const { score, reasons } = calculateScore(row);

        return { 
            name: row.City || `Location @ ${lat.toFixed(2)}, ${lng.toFixed(2)}`, 
            location: { lat, lng }, 
            score, 
            reasons 
        };
    }).filter(Boolean);

    return scoredResults.sort((a:any, b:any) => b.score - a.score);
  } catch (error) {
    console.error('Data Processing Error:', error);
    throw new Error('Failed to process optimization dataset.');
  }
}