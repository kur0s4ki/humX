import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, TrendingUp, Users, DollarSign, HelpCircle, Briefcase } from "lucide-react";

// TypeScript interfaces and types
interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
  maxEmployees?: number;
}

interface CalculationInputs {
  monthlyLeads: number;
  averageSaleValue: number;
  currentConversionRate: number;
  profitMargin: number;
  monthlyMarketingSpend: number;
  implementationCost: number;
  trainingCost: number;
  employeeCount: number;
  annualSalaryPerEmployee: number;
  selectedPricingTier: string;
  customAiPrice: number;
}

interface CalculationResults {
  currentMonthlyRevenue: number;
  aiMonthlyRevenue: number;
  currentMonthlyProfit: number;
  aiMonthlyProfit: number;
  revenueIncrease: number;
  profitIncrease: number;
  currentAnnualRevenue: number;
  aiAnnualRevenue: number;
  currentAnnualProfit: number;
  aiAnnualProfit: number;
  monthlyProfitIncrease: number;
  annualProfitIncrease: number;
  totalEmployeeCosts: number;
  totalAiCosts: number;
  aiSystemCost: number;
  totalImplementationCosts: number;
  netMonthlyProfit: number;
  netAnnualProfit: number;
  roi: number;
  paybackMonths: number;
  totalSavings: number;
  aiConversionRate: number;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "small",
    name: "Small Firm",
    monthlyPrice: 750,
    description: "Up to 5 employees",
    maxEmployees: 5
  },
  {
    id: "medium",
    name: "Medium Firm",
    monthlyPrice: 1500,
    description: "6-20 employees",
    maxEmployees: 20
  },
  {
    id: "large",
    name: "Large Firm",
    monthlyPrice: 2500,
    description: "21-50 employees",
    maxEmployees: 50
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 4000,
    description: "50+ employees",
  },
  {
    id: "custom",
    name: "Custom Pricing",
    monthlyPrice: 0,
    description: "Contact for pricing",
  }
];

// Animated Number Component
interface AnimatedNumberProps {
  value: number;
  formatFn?: (value: number) => string;
  className?: string;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  formatFn = (val) => val.toString(),
  className = "",
  duration = 300
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startValueRef = useRef<number>(value);

  useEffect(() => {
    if (Math.abs(value - displayValue) < 0.01) return;

    setIsAnimating(true);
    startValueRef.current = displayValue;
    startTimeRef.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = startValueRef.current + (value - startValueRef.current) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className={`${className} ${isAnimating ? 'transition-all duration-200' : ''}`}>
      {formatFn(displayValue)}
    </span>
  );
};

const ROICalculator = () => {
  // Enhanced state management for all inputs
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  const [averageSaleValue, setAverageSaleValue] = useState(2500);
  const [currentConversionRate, setCurrentConversionRate] = useState(15);
  const [profitMargin, setProfitMargin] = useState(75);
  const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState(0);
  const [implementationCost, setImplementationCost] = useState(5000);
  const [trainingCost, setTrainingCost] = useState(2000);
  const [employeeCount, setEmployeeCount] = useState(1);
  const [annualSalaryPerEmployee, setAnnualSalaryPerEmployee] = useState(45000);
  const [selectedPricingTier, setSelectedPricingTier] = useState("small");
  const [customAiPrice, setCustomAiPrice] = useState(1000);

  // Helper function to get current AI pricing
  const getCurrentAiPrice = (): number => {
    if (selectedPricingTier === "custom") {
      return customAiPrice;
    }
    const tier = PRICING_TIERS.find(t => t.id === selectedPricingTier);
    return tier?.monthlyPrice || 750;
  };

  // Enhanced calculation engine
  const calculateResults = (): CalculationResults => {
    // AI improvement logic - 8% improvement with max 50%
    const aiConversionRate = Math.min(currentConversionRate + 8, 50);

    // Revenue calculations
    const currentMonthlyRevenue = monthlyLeads * (currentConversionRate / 100) * averageSaleValue;
    const aiMonthlyRevenue = monthlyLeads * (aiConversionRate / 100) * averageSaleValue;

    // Profit calculations (using profit margin)
    const currentMonthlyProfit = currentMonthlyRevenue * (profitMargin / 100);
    const aiMonthlyProfit = aiMonthlyRevenue * (profitMargin / 100);

    // Annual calculations
    const currentAnnualRevenue = currentMonthlyRevenue * 12;
    const aiAnnualRevenue = aiMonthlyRevenue * 12;
    const currentAnnualProfit = currentMonthlyProfit * 12;
    const aiAnnualProfit = aiMonthlyProfit * 12;

    // Increases
    const revenueIncrease = currentMonthlyRevenue > 0 ? ((aiMonthlyRevenue - currentMonthlyRevenue) / currentMonthlyRevenue) * 100 : 0;
    const profitIncrease = currentMonthlyProfit > 0 ? ((aiMonthlyProfit - currentMonthlyProfit) / currentMonthlyProfit) * 100 : 0;
    const monthlyProfitIncrease = aiMonthlyProfit - currentMonthlyProfit;
    const annualProfitIncrease = monthlyProfitIncrease * 12;

    // Cost calculations
    const aiSystemCost = getCurrentAiPrice();
    const totalEmployeeCosts = employeeCount * annualSalaryPerEmployee;
    const totalImplementationCosts = implementationCost + trainingCost;
    const totalAiCosts = (aiSystemCost * 12) + totalImplementationCosts;

    // Net profit calculations
    const netMonthlyProfit = monthlyProfitIncrease - aiSystemCost;
    const netAnnualProfit = netMonthlyProfit * 12;

    // ROI calculation (including implementation costs)
    const roi = totalAiCosts > 0 ? (netAnnualProfit / totalAiCosts) * 100 : 0;

    // Payback period (including implementation costs)
    const paybackMonths = netMonthlyProfit > 0 ? totalImplementationCosts / netMonthlyProfit + 1 : 0;

    // Total savings (AI vs hiring employees)
    const totalSavings = totalEmployeeCosts - totalAiCosts;

    return {
      currentMonthlyRevenue,
      aiMonthlyRevenue,
      currentMonthlyProfit,
      aiMonthlyProfit,
      revenueIncrease,
      profitIncrease,
      currentAnnualRevenue,
      aiAnnualRevenue,
      currentAnnualProfit,
      aiAnnualProfit,
      monthlyProfitIncrease,
      annualProfitIncrease,
      totalEmployeeCosts,
      totalAiCosts,
      aiSystemCost,
      totalImplementationCosts,
      netMonthlyProfit,
      netAnnualProfit,
      roi,
      paybackMonths,
      totalSavings,
      aiConversionRate
    };
  };

  const results = calculateResults();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Animated formatters
  const formatCurrencyAnimated = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(Math.round(amount));
  };

  const formatPercentageAnimated = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const TooltipWrapper = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-purple-primary text-white px-6 py-2 text-sm font-medium">
            <Calculator className="w-4 h-4 mr-2" />
            Comprehensive ROI Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI vs Employee Cost Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare the total cost of ownership between hiring additional staff and implementing our AI system for your law firm
          </p>
        </div>

        {/* Main Calculator Grid - Three Columns */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Business Inputs */}
          <div className="bg-gradient-purple rounded-2xl p-8 text-white shadow-card">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <Briefcase className="w-6 h-6 mr-2" />
              Business Parameters
            </h2>

            {/* Monthly Leads */}
            <div className="mb-6">
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
            <div className="mb-6">
              <TooltipWrapper content="Average value of each successful case or client engagement">
                <label className="flex text-lg font-medium mb-4 items-center">
                  Average Sale Value
                  <HelpCircle className="w-4 h-4 ml-2 opacity-70" />
                </label>
              </TooltipWrapper>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">£</span>
                <Input
                  type="number"
                  value={averageSaleValue}
                  onChange={(e) => setAverageSaleValue(Number(e.target.value) || 0)}
                  className="pl-8 bg-white/10 border-white/20 text-white placeholder-white/60 text-lg h-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  placeholder="2500"
                />
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="mb-6">
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

            {/* Profit Margin */}
            <div className="mb-6">
              <TooltipWrapper content="Percentage of revenue that becomes profit after all expenses">
                <label className="flex text-lg font-medium mb-4 items-center">
                  Profit Margin: {profitMargin}%
                  <HelpCircle className="w-4 h-4 ml-2 opacity-70" />
                </label>
              </TooltipWrapper>
              <Slider
                value={[profitMargin]}
                onValueChange={(value) => setProfitMargin(value[0])}
                min={10}
                max={95}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-sm opacity-80">
                <span>10%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Monthly Marketing Spend */}
            <div className="mb-6">
              <TooltipWrapper content="Optional: Current monthly marketing spend for lead generation">
                <label className="flex text-lg font-medium mb-4 items-center">
                  Monthly Marketing Spend (Optional)
                  <HelpCircle className="w-4 h-4 ml-2 opacity-70" />
                </label>
              </TooltipWrapper>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">£</span>
                <Input
                  type="number"
                  value={monthlyMarketingSpend}
                  onChange={(e) => setMonthlyMarketingSpend(Number(e.target.value) || 0)}
                  className="pl-8 bg-white/10 border-white/20 text-white placeholder-white/60 text-lg h-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  placeholder="0"
                />
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

          {/* Middle Panel - Cost Comparison */}
          <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-roi" />
              Cost Comparison
            </h2>

            {/* Employee Costs Section */}
            <div className="mb-8 p-6 bg-red-50 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold mb-6 text-red-metric flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Employee Option
              </h3>

              {/* Number of Employees */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-4 text-gray-700">
                  Number of Additional Employees: {employeeCount}
                </label>
                <Slider
                  value={[employeeCount]}
                  onValueChange={(value) => setEmployeeCount(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="mb-2 [&>*:first-child]:bg-red-200 [&>*:first-child>*]:bg-red-metric [&>*:last-child]:bg-white [&>*:last-child]:border-2 [&>*:last-child]:border-gray-800 [&>*:last-child]:rounded-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              {/* Annual Salary */}
              <div className="mb-6">
                <TooltipWrapper content="Average annual salary including benefits and overhead costs">
                  <label className="flex text-sm font-medium mb-4 text-gray-700 items-center">
                    Annual Salary per Employee
                    <HelpCircle className="w-4 h-4 ml-2 opacity-70" />
                  </label>
                </TooltipWrapper>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">£</span>
                  <Input
                    type="number"
                    value={annualSalaryPerEmployee}
                    onChange={(e) => setAnnualSalaryPerEmployee(Number(e.target.value) || 0)}
                    className="pl-8 text-sm h-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    placeholder="45000"
                  />
                </div>
              </div>

              {/* Total Employee Cost Display */}
              <div className="bg-white rounded-lg p-4 border border-red-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-metric mb-1">
                    <AnimatedNumber
                      value={results.totalEmployeeCosts}
                      formatFn={formatCurrencyAnimated}
                    />
                  </div>
                  <div className="text-sm text-gray-600">Total Annual Employee Costs</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {employeeCount} × {formatCurrency(annualSalaryPerEmployee)}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Costs Section */}
            <div className="mb-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold mb-6 text-green-metric flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                AI System Option
              </h3>

              {/* Pricing Tier Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-4 text-gray-700">
                  Select Pricing Tier
                </label>
                <Select value={selectedPricingTier} onValueChange={setSelectedPricingTier}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select pricing tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICING_TIERS.map((tier) => (
                      <SelectItem key={tier.id} value={tier.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{tier.name}</span>
                          <span className="ml-4 text-sm text-gray-500">
                            {tier.id === "custom" ? "Custom" : formatCurrency(tier.monthlyPrice) + "/mo"}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  {PRICING_TIERS.find(t => t.id === selectedPricingTier)?.description}
                </p>
              </div>

              {/* Custom Pricing Input */}
              {selectedPricingTier === "custom" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-4 text-gray-700">
                    Custom Monthly Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">£</span>
                    <Input
                      type="number"
                      value={customAiPrice}
                      onChange={(e) => setCustomAiPrice(Number(e.target.value) || 0)}
                      className="pl-8 text-sm h-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      placeholder="1000"
                    />
                  </div>
                </div>
              )}

              {/* Implementation Costs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <TooltipWrapper content="One-time setup and integration costs">
                    <label className="flex text-sm font-medium mb-2 text-gray-700 items-center h-6">
                      Implementation Cost
                      <HelpCircle className="w-3 h-3 ml-1 opacity-70" />
                    </label>
                  </TooltipWrapper>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">£</span>
                    <Input
                      type="number"
                      value={implementationCost}
                      onChange={(e) => setImplementationCost(Number(e.target.value) || 0)}
                      className="pl-8 text-sm h-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      placeholder="5000"
                    />
                  </div>
                </div>
                <div>
                  <TooltipWrapper content="One-time training and onboarding costs">
                    <label className="flex text-sm font-medium mb-2 text-gray-700 items-center h-6">
                      Training Cost
                      <HelpCircle className="w-3 h-3 ml-1 opacity-70" />
                    </label>
                  </TooltipWrapper>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">£</span>
                    <Input
                      type="number"
                      value={trainingCost}
                      onChange={(e) => setTrainingCost(Number(e.target.value) || 0)}
                      className="pl-8 text-sm h-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              {/* Total AI Cost Display */}
              <div className="bg-white rounded-lg p-4 border border-green-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-metric mb-1">
                    <AnimatedNumber
                      value={results.totalAiCosts}
                      formatFn={formatCurrencyAnimated}
                    />
                  </div>
                  <div className="text-sm text-gray-600">Total Annual AI Costs</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(results.aiSystemCost * 12)} + {formatCurrency(results.totalImplementationCosts)} setup
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Comparison */}
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-roi text-center">
                Annual Savings with AI
              </h3>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${results.totalSavings > 0 ? 'text-green-metric' : 'text-red-metric'}`}>
                  {results.totalSavings > 0 ? '+' : ''}
                  <AnimatedNumber
                    value={results.totalSavings}
                    formatFn={formatCurrencyAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {results.totalSavings > 0 ? 'Savings' : 'Additional Cost'} vs Hiring Employees
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Enhanced Results */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-secondary" />
              Comprehensive Results
            </h2>

            {/* Revenue & Profit Comparison */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Revenue & Profit Impact</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Revenue</span>
                    <div className="text-right">
                      <div className="font-semibold">
                        <AnimatedNumber
                          value={results.currentMonthlyRevenue}
                          formatFn={formatCurrencyAnimated}
                        />/month
                      </div>
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
                      <div className="font-semibold">
                        <AnimatedNumber
                          value={results.aiMonthlyRevenue}
                          formatFn={formatCurrencyAnimated}
                        />/month
                      </div>
                      <div className="text-sm text-gray-500">{results.aiConversionRate}% conversion</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-900 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Badge className="bg-green-primary text-white px-4 py-2 justify-center">
                  +<AnimatedNumber
                    value={results.revenueIncrease}
                    formatFn={formatPercentageAnimated}
                  /> Revenue
                </Badge>
                <Badge className="bg-purple-primary text-white px-4 py-2 justify-center">
                  +<AnimatedNumber
                    value={results.profitIncrease}
                    formatFn={formatPercentageAnimated}
                  /> Profit
                </Badge>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-red-metric mb-1">
                  <AnimatedNumber
                    value={results.currentAnnualProfit}
                    formatFn={formatCurrencyAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600">Current Annual Profit</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-green-metric mb-1">
                  <AnimatedNumber
                    value={results.aiAnnualProfit}
                    formatFn={formatCurrencyAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600">AI Annual Profit</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-blue-roi mb-1">
                  <AnimatedNumber
                    value={results.monthlyProfitIncrease}
                    formatFn={formatCurrencyAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600">Monthly Profit Increase</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-purple-primary mb-1">
                  <AnimatedNumber
                    value={results.annualProfitIncrease}
                    formatFn={formatCurrencyAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600">Annual Profit Increase</div>
              </div>
            </div>

            {/* ROI and Payback */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-roi mb-2">
                  <AnimatedNumber
                    value={results.roi}
                    formatFn={formatPercentageAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600 font-medium">Return on Investment</div>
                <div className="text-xs text-gray-500 mt-1">Including all costs</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-3xl font-bold text-orange-payback mb-2 flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-orange-payback text-white text-sm flex items-center justify-center mr-2">!</span>
                  <AnimatedNumber
                    value={results.paybackMonths}
                    formatFn={(val) => val.toFixed(1)}
                  />
                </div>
                <div className="text-sm text-gray-600 font-medium">Months to Payback</div>
                <div className="text-xs text-gray-500 mt-1">Break-even point</div>
              </div>
            </div>

            {/* Total Cost of Ownership Summary */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Total Cost of Ownership (Annual)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-red-metric mb-1">
                    <AnimatedNumber
                      value={results.totalEmployeeCosts}
                      formatFn={formatCurrencyAnimated}
                    />
                  </div>
                  <div className="text-sm text-gray-600">Employee Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-metric mb-1">
                    <AnimatedNumber
                      value={results.totalAiCosts}
                      formatFn={formatCurrencyAnimated}
                    />
                  </div>
                  <div className="text-sm text-gray-600">AI System Costs</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300 text-center">
                <div className={`text-xl font-bold ${results.totalSavings > 0 ? 'text-green-metric' : 'text-red-metric'}`}>
                  {results.totalSavings > 0 ? 'Save ' : 'Additional Cost: '}
                  <AnimatedNumber
                    value={Math.abs(results.totalSavings)}
                    formatFn={formatCurrencyAnimated}
                  />
                </div>
                <div className="text-sm text-gray-600">with AI vs Hiring</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-full bg-gradient-green text-white font-semibold py-4 text-lg rounded-xl hover:opacity-90 transition-opacity">
              Get Started with AI Implementation
            </Button>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose AI Over Additional Staff?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Availability</h4>
                <p className="text-sm text-gray-600">
                  AI works around the clock, capturing leads and qualifying prospects even when your office is closed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-roi rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Consistent Performance</h4>
                <p className="text-sm text-gray-600">
                  No sick days, vacation time, or performance variations. AI delivers consistent results every day.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Scalable Solution</h4>
                <p className="text-sm text-gray-600">
                  Handle increased lead volume without proportional cost increases. Scale your business efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;