import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js";
import Sales from "../models/Sales.js";
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    SUCCESS,
    SUCCESS_MESS
} = Strings;


export const getMonthlySale = async (req, res) => {
    const { branch } = req.params;
    try {
        const sales = await Sales.getSales(branch);

        const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

        const monthlySales = months.map((month, index) => {
            const total = sales
                .filter((sale) => new Date(sale.createdAt).getMonth() === index)
                .reduce((acc, sale) => acc + (sale.total || 0), 0);
            return { month, total };
        });

        ApiResponseModel(res, SUCCESS, "Monthly sales fetched", monthlySales);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

//code from claude AI
export const todaysSale = async (req, res) => {
    const { branch } = req.params;
    try {
        const sales = await Sales.getSales(branch);
        const products = await Product.fetchProducts(branch);
        console.log(sales);
        // Filter today's sales
        const today = new Date();
        const todaySales = sales.filter((sale) => {
            const saleDate = new Date(sale.createdAt);
            return (
                saleDate.getFullYear() === today.getFullYear() &&
                saleDate.getMonth() === today.getMonth() &&
                saleDate.getDate() === today.getDate()
            );
        });

        // Filter yesterday's sales
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdaySales = sales.filter((sale) => {
            const saleDate = new Date(sale.createdAt);
            return (
                saleDate.getFullYear() === yesterday.getFullYear() &&
                saleDate.getMonth() === yesterday.getMonth() &&
                saleDate.getDate() === yesterday.getDate()
            );
        });

        // Total Sales
        const totalSalesToday = todaySales.reduce((acc, sale) => acc + (sale.total || 0), 0);
        const totalSalesYesterday = yesterdaySales.reduce((acc, sale) => acc + (sale.total || 0), 0);
        const totalSalesChange = totalSalesYesterday === 0 ? null
            : (((totalSalesToday - totalSalesYesterday) / totalSalesYesterday) * 100).toFixed(1);

        // Product Sold
        const productSoldToday = todaySales.reduce((acc, sale) => acc + (sale.itemSold || 0), 0);
        const productSoldYesterday = yesterdaySales.reduce((acc, sale) => acc + (sale.itemSold || 0), 0);
        const productSoldChange = productSoldYesterday === 0 ? null
            : (((productSoldToday - productSoldYesterday) / productSoldYesterday) * 100).toFixed(1);

        // Stocks (sum of all product quantities)
        const totalStocks = products.reduce((acc, product) => acc + (product.quantity || 0), 0);

        ApiResponseModel(res, SUCCESS, "Today's sales fetched", {
            totalSales: totalSalesToday,
            totalSalesChange,
            productSold: productSoldToday,
            productSoldChange,
            totalStocks,
        });
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const calculateNetProfit = async (req, res) => {
    try {
        const { branch } = req.params;
        const sales = await Sales.getSales(branch);

        const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

        const netProfitByMonth = months.map((month, index) => {
            const monthlySales = sales.filter((sale) => new Date(sale.createdAt).getMonth() === index);

            const totalSales = monthlySales.reduce((acc, sale) => acc + (sale.total || 0), 0);
            const vipDiscount = monthlySales.reduce((acc, sale) => acc + (sale.discountAmount || 0), 0);
            const vipSales = monthlySales
                .filter((sale) => sale.vip === 'Yes')
                .reduce((acc, sale) => acc + (sale.total || 0), 0);
            const nonVipSales = monthlySales
                .filter((sale) => sale.vip === 'No')
                .reduce((acc, sale) => acc + (sale.total || 0), 0);

            return {
                month,
                data: [
                    { label: `PHP ${totalSales.toLocaleString()}`, value: totalSales, color: '#c4161cae' },
                    { label: `PHP ${vipDiscount.toLocaleString()}`, value: vipDiscount, color: '#f59f0bab' },
                    { label: `PHP ${vipSales.toLocaleString()}`, value: vipSales, color: '#1a6fc4ab' },
                    { label: `PHP ${nonVipSales.toLocaleString()}`, value: nonVipSales, color: '#4caf50ab' },
                ]
            };
        });

        ApiResponseModel(res, SUCCESS, "Net profit fetched", netProfitByMonth);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getTopProducts = async (req, res) => {
    try {
        const { branch } = req.params;
        const sales = await Sales.getSales(branch);

        const colors = [
            { bgcolor: "#D63F14", bgcolor2: "#d63f1440" },
            { bgcolor: "#FFA000", bgcolor2: "#ffa00040" },
            { bgcolor: "#0088FF", bgcolor2: "#0088FF40" },
            { bgcolor: "#603309", bgcolor2: "#60330940" },
            { bgcolor: "#4CAF50", bgcolor2: "#4caf5040" },
            { bgcolor: "#9C27B0", bgcolor2: "#9c27b040" },
            { bgcolor: "#00BCD4", bgcolor2: "#00bcd440" },
            { bgcolor: "#E91E63", bgcolor2: "#e91e6340" },
            { bgcolor: "#FF5722", bgcolor2: "#ff572240" },
            { bgcolor: "#607D8B", bgcolor2: "#607d8b40" },
        ];

        const productMap = {};

        sales.forEach((sale) => {
            sale.items.forEach((item) => {
                const id = item._id;
                if (!productMap[id]) {
                    productMap[id] = {
                        id,
                        name: item.productName,
                        totalQuantitySold: 0,
                    };
                }
                productMap[id].totalQuantitySold += item.quantity || 1;
            });
        });

        const maxSold = Math.max(...Object.values(productMap).map((p) => p.totalQuantitySold), 1);

        const topProducts = Object.values(productMap)
            .sort((a, b) => b.totalQuantitySold - a.totalQuantitySold)
            .filter((p) => p.totalQuantitySold >= 10) 
            .slice(0, 10)
            .map((product, index) => ({
                id: String(index + 1).padStart(2, '0'),
                name: product.name,
                bgcolor: colors[index].bgcolor,
                bgcolor2: colors[index].bgcolor2,
                completed: Math.round((product.totalQuantitySold / maxSold) * 100),
                sales: String(product.totalQuantitySold),
            }));
        ApiResponseModel(res, SUCCESS, "Top products fetched", topProducts);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const todayRevenue = async (req, res) => {
    try {
        const { branch } = req.params;
        const sales = await Sales.getSales(branch);

        const today = new Date();
        const todaySales = sales.filter((sale) => {
            const saleDate = new Date(sale.createdAt);
            return (
                saleDate.getFullYear() === today.getFullYear() &&
                saleDate.getMonth() === today.getMonth() &&
                saleDate.getDate() === today.getDate()
            );
        });

        const revenue = todaySales.reduce((acc, sale) => acc + sale.total, 0);

        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, { revenue });
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}