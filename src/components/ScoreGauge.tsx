'use client';

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  colorClass: string;
}

const ScoreGauge = ({ score, maxScore = 10, colorClass }: ScoreGaugeProps) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45; // Circle radius is 45
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress arc */}
        <circle
          className={colorClass}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="absolute text-3xl font-bold text-gray-700">{score}</span>
    </div>
  );
};

export default ScoreGauge;