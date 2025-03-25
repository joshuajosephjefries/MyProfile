const fs = require("fs");
const filePath = "/tmp/visitorCount.json"; // Temporary storage in AWS Lambda

exports.handler = async function () {
    let count = 0;

    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");
            count = JSON.parse(data).count || 0;
        }
    } catch (error) {
        console.error("Error reading file:", error);
    }

    count++;

    try {
        fs.writeFileSync(filePath, JSON.stringify({ count }));
    } catch (error) {
        console.error("Error writing file:", error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ count }),
    };
};
