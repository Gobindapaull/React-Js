import { Percent } from "@uniswap/sdk-core"; // "@uniswap/sdk-core": "^3.2.3",

async function main() {
    try {
        const percent = new Percent(50, 10_000);
        console.log(percent.toFixed(2)) // 0.50

    } catch (error) {
        console.log(error)
    }
}

main();
