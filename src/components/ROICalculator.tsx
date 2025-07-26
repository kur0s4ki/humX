import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp } from "lucide-react";

const ROICalculator = () => {
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  const [averageSaleValue, setAverageSaleValue] = useState(2500);
  const [currentConversionRate, setCurrentConversionRate] = useState(15);

  // AI improvement assumptions
  const aiConversionRate = Math.min(currentConversionRate + 8, 50); // 8% improvement, max 50%
  
  // Calculations
  const currentMonthlyRevenue = monthlyLeads * (currentConversionRate / 100) * averageSaleValue;
  const aiMonthlyRevenue = monthlyLeads * (aiConversionRate / 100) * averageSaleValue;
  const revenueIncrease = ((aiMonthlyRevenue - currentMonthlyRevenue) / currentMonthlyRevenue) * 100;
  
  const currentAnnualRevenue = currentMonthlyRevenue * 12;
  const aiAnnualRevenue = aiMonthlyRevenue * 12;
  const monthlyProfitIncrease = aiMonthlyRevenue - currentMonthlyRevenue;
  const annualProfitIncrease = monthlyProfitIncrease * 12;
  
  // Assuming AI system costs $1000/month
  const aiSystemCost = 1000;
  const netMonthlyProfit = monthlyProfitIncrease - aiSystemCost;
  const roi = netMonthlyProfit > 0 ? (netMonthlyProfit * 12 / (aiSystemCost * 12)) * 100 : 0;
  const paybackMonths = monthlyProfitIncrease > aiSystemCost ? aiSystemCost / (monthlyProfitIncrease - aiSystemCost) : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-purple-primary text-white px-6 py-2 text-sm font-medium">
            <Calculator className="w-4 h-4 mr-2" />
            ROI Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculate Your Exact Profit
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See exactly how much additional revenue our AI system will generate for your law firm
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Current Business */}
          <div className="bg-gradient-purple rounded-2xl p-8 text-white shadow-card">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              Your Current Business
            </h2>

            {/* Monthly Leads */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-4">
                Monthly Leads: {monthlyLeads}
              </label>
              <Slider
                value={[monthlyLeads]}
                onValueChange={(value) => setMonthlyLeads(value[0])}
                min={50}
                max={500}
                step={10}
                className="mb-2"
              />
              <div className="flex justify-between text-sm opacity-80">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Average Sale Value */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-4">
                Average Sale Value
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">£</span>
                <Input
                  type="number"
                  value={averageSaleValue}
                  onChange={(e) => setAverageSaleValue(Number(e.target.value))}
                  className="pl-8 bg-white/10 border-white/20 text-white placeholder-white/60 text-lg h-12"
                  placeholder="2500"
                />
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-4">
                Current Conversion Rate: {currentConversionRate}%
              </label>
              <Slider
                value={[currentConversionRate]}
                onValueChange={(value) => setCurrentConversionRate(value[0])}
                min={5}
                max={50}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm opacity-80">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Proven Method Box */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Our Proven Method</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Based on 500+ law firms: AI typically increases conversion rates by 8-12% through 
                better lead qualification, 24/7 availability, and instant response times.
              </p>
            </div>
          </div>

          {/* Right Panel - AI Results */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-secondary" />
              Your Results with AI
            </h2>

            {/* Revenue Comparison */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Revenue Comparison</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Revenue</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(currentMonthlyRevenue)}/month</div>
                      <div className="text-sm text-gray-500">{currentConversionRate}% conversion</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-700 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">With AI System</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(aiMonthlyRevenue)}/month</div>
                      <div className="text-sm text-gray-500">{aiConversionRate}% conversion</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-900 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Badge className="bg-green-primary text-white px-4 py-2">
                  +{revenueIncrease.toFixed(1)}% Revenue Increase
                </Badge>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-metric mb-1">
                  {formatCurrency(currentAnnualRevenue)}
                </div>
                <div className="text-sm text-gray-600">Current Annual</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-metric mb-1">
                  {formatCurrency(aiAnnualRevenue)}
                </div>
                <div className="text-sm text-gray-600">With AI Annual</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-secondary mb-1">
                  {formatCurrency(monthlyProfitIncrease)}
                </div>
                <div className="text-sm text-gray-600">Monthly Profit Increase</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-primary mb-1">
                  {formatCurrency(annualProfitIncrease)}
                </div>
                <div className="text-sm text-gray-600">Annual Profit Increase</div>
              </div>
            </div>

            {/* Bottom Metrics */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-roi mb-1">
                  {roi.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Return on Investment</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-orange-payback mb-1 flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-orange-payback text-white text-sm flex items-center justify-center mr-2">!</span>
                  {paybackMonths.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Months to Payback</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-full bg-gradient-green text-white font-semibold py-4 text-lg rounded-xl hover:opacity-90 transition-opacity">
              Start My Profit Increase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;