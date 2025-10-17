import { Users, Building2, Clock, FileCheck } from "lucide-react";
// Mock data
export const stats = [
  {
    label: "Tổng số TTTM/Thương hiệu đang hoạt động",
    value: "156",
    change: "+12%",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    label: "Tổng số nhân viên đang hoạt động",
    value: "24",
    change: "+3",
    icon: Users,
    color: "bg-green-500",
  },
  {
    label: "Tổng số yêu cầu xác thực đang chờ",
    value: "8",
    change: "-2",
    icon: Clock,
    color: "bg-yellow-500",
  },
  {
    label: "Tổng số hợp đồng trong tháng",
    value: "45",
    change: "+18%",
    icon: FileCheck,
    color: "bg-purple-500",
  },
];

export const mallsBrands = [
  {
    id: 1,
    name: "Vincom Center",
    type: "Mall",
    location: "District 1, HCMC",
    staff: "Nguyen Van A",
    status: "active",
    contracts: 5,
  },
  {
    id: 2,
    name: "Starbucks",
    type: "Brand",
    location: "Multiple",
    staff: "Tran Thi B",
    status: "active",
    contracts: 12,
  },
  {
    id: 3,
    name: "Lotte Mart",
    type: "Mall",
    location: "District 7, HCMC",
    staff: "Nguyen Van A",
    status: "active",
    contracts: 8,
  },
  {
    id: 4,
    name: "The Coffee House",
    type: "Brand",
    location: "Nationwide",
    staff: "Le Van C",
    status: "inactive",
    contracts: 3,
  },
];

export const areaAssignments = [
  {
    area: "Ho Chi Minh City",
    staff: ["Nguyen Van A", "Pham Van E"],
    malls: 45,
    brands: 67,
  },
  { area: "Hanoi", staff: ["Tran Thi B"], malls: 32, brands: 54 },
  { area: "Da Nang", staff: ["Le Van C"], malls: 18, brands: 28 },
  { area: "Can Tho", staff: ["Pham Thi D"], malls: 12, brands: 19 },
];
export const pendingVerifications = [
  {
    id: 1,
    name: "Vincom Center",
    type: "Mall",
    location: "District 1, HCMC",
    date: "2025-10-12",
    staff: "Nguyen Van A",
  },
  {
    id: 2,
    name: "Starbucks",
    type: "Brand",
    location: "District 3, HCMC",
    date: "2025-10-13",
    staff: "Tran Thi B",
  },
  {
    id: 3,
    name: "Aeon Mall",
    type: "Mall",
    location: "District 7, HCMC",
    date: "2025-10-14",
    staff: "Le Van C",
  },
  {
    id: 4,
    name: "The Coffee House",
    type: "Brand",
    location: "District 5, HCMC",
    date: "2025-10-15",
    staff: null,
  },
];

export const staffPerformance = [
  {
    id: 1,
    name: "Nguyen Van A",
    area: "HCMC",
    contracts: 12,
    revenue: "450M VND",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Tran Thi B",
    area: "HCMC",
    contracts: 15,
    revenue: "520M VND",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Le Van C",
    area: "HCMC",
    contracts: 8,
    revenue: "280M VND",
    rating: 4.5,
  },
];
export const monthlyContractsData = [
  { month: "Jan", contracts: 5, revenue: 450 },
  { month: "Feb", contracts: 8, revenue: 600 },
  { month: "Mar", contracts: 12, revenue: 900 },
  { month: "Apr", contracts: 7, revenue: 520 },
  { month: "May", contracts: 10, revenue: 750 },
  { month: "Jun", contracts: 15, revenue: 1100 },
];

export const quarterlyContractsData = [
  { quarter: "Q1", contracts: 25, revenue: 1950 },
  { quarter: "Q2", contracts: 32, revenue: 2400 },
  { quarter: "Q3", contracts: 34, revenue: 2550 },
  { quarter: "Q4", contracts: 29, revenue: 2100 },
];
export const matchingData = [
  {
    id: "1",
    mallName: "Vincom Center",
    brandName: "Nike",
    location: "HCM",
    matchScore: 85,
    date: "2025-10-15",
  },
  {
    id: "2",
    mallName: "AEON Mall",
    brandName: "Adidas",
    location: "HCM",
    matchScore: 72,
    date: "2025-10-14",
  },
  {
    id: "3",
    mallName: "Takashimaya",
    brandName: "Puma",
    location: "HCM",
    matchScore: 90,
    date: "2025-10-13",
  },
  {
    id: "4",
    mallName: "Vincom Mega Mall",
    brandName: "Reebok",
    location: "HCM",
    matchScore: 78,
    date: "2025-10-12",
  },
];
export const defaultWeights = {
  location: 0.4,
  brandPopularity: 0.3,
  mallTraffic: 0.2,
  rentalCost: 0.1,
};
