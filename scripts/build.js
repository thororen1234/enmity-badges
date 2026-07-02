const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const files = fs.readdirSync(dataDir).filter(e => e.endsWith('.json'));

const result = {};

for (const file of files) {
    if (/^\d+\.json$/.test(file)) {
        const userId = file.replace('.json', '');
        const filePath = path.join(dataDir, file);

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const userBadges = JSON.parse(content);

            if (Array.isArray(userBadges) && userBadges.length > 0) {
                result[userId] = userBadges;
            } else if (userBadges && !Array.isArray(userBadges)) {
                result[userId] = [userBadges];
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e);
        }
    }
}

const outputPath = path.join(rootDir, 'badges.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Successfully built badges.json with ${Object.keys(result).length} users.`);
