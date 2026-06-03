// import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../src/generated/client";

// const prisma = new PrismaClient();

// import { PrismaClient } from "../src/generated/client";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/client";

const adapter = new PrismaPg({
connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
adapter,
});


async function main() {

await prisma.college.createMany({

data: [

{
name:"IIT Bombay",
location:"Mumbai",
fees:250000,
rating:4.9,
courses:["CSE","EE","ME"],
placements:"₹32 LPA"
},

{
name:"IIT Delhi",
location:"Delhi",
fees:240000,
rating:4.8,
courses:["CSE","ECE"],
placements:"₹30 LPA"
},

{
name:"BITS Pilani",
location:"Pilani",
fees:550000,
rating:4.7,
courses:["CSE","ECE"],
placements:"₹26 LPA"
},

{
name:"NIT Trichy",
location:"Tamil Nadu",
fees:180000,
rating:4.6,
courses:["CSE","Civil"],
placements:"₹18 LPA"
},

{
name:"IIIT Hyderabad",
location:"Hyderabad",
fees:420000,
rating:4.8,
courses:["CSE","AI"],
placements:"₹35 LPA"
},

{
name:"VIT Vellore",
location:"Vellore",
fees:350000,
rating:4.3,
courses:["CSE","IT"],
placements:"₹12 LPA"
},

{
name:"SRM University",
location:"Chennai",
fees:300000,
rating:4.2,
courses:["CSE","ECE"],
placements:"₹10 LPA"
}

]

});

console.log("Seeded");

}

main()
.finally(()=>prisma.$disconnect());