import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
const criteria = [
  { key: "location", label: "Vị trí" },
  { key: "brandPopularity", label: "Độ nổi tiếng Brand" },
  { key: "mallTraffic", label: "Lưu lượng Mall" },
  { key: "rentalCost", label: "Giá thuê" },
];

export default function MatchingConfigShadcn() {
  const [weights, setWeights] = useState({
    location: 0.4,
    brandPopularity: 0.3,
    mallTraffic: 0.2,
    rentalCost: 0.1,
  });

  const handleChange = (key: string, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle>Matching Config & Algorithm</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {criteria.map((c) => (
          <div key={c.key}>
            <div className="flex justify-between mb-1">
              <span>{c.label}</span>
              <span>{weights[c.key].toFixed(2)}</span>
            </div>
            <Slider
              value={weights[c.key]}
              max={1}
              step={0.01}
              onValueChange={(val: number[]) => handleChange(c.key, val[0])}
            >
              <SliderTrack>
                <SliderRange />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </div>
        ))}
        <div
          className={`font-semibold ${totalWeight > 1 ? "text-red-600" : "text-gray-700"}`}
        >
          Tổng trọng số: {totalWeight.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
}
