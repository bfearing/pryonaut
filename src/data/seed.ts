import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

import { sets, editions, labels, priorities, statuses } from "./data";

const tasks = Array.from({ length: 100 }, () => ({
  id: `TASK-${faker.datatype.number({ min: 1000, max: 9999 })}`,
  image: faker.hacker.phrase(),
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
  set: faker.helpers.arrayElement(sets).value,
  edition: faker.helpers.arrayElement(editions).value,
}));

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
);

// console.log("✅ Tasks data generated.");
