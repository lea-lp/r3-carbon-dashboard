import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Sector } from './sectors/sector.entity';
import { Emission } from './emissions/emission.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Sector, Emission],
  synchronize: true,
});

type SeedSector = {
  name: string;
  slug: string;
  emissions: Array<{ label: string; value: number; unit: string; source: string }>;
};

const SEED_DATA: SeedSector[] = [
  {
    name: 'Transport',
    slug: 'transport',
    emissions: [
      { label: 'Voiture essence (segment moyen)', value: 0.217, unit: 'kgCO2e/km', source: 'Base Empreinte ADEME 2024' },
      { label: 'Avion long-courrier (éco)', value: 0.195, unit: 'kgCO2e/km', source: 'Base Empreinte ADEME 2024' },
      { label: 'Train grandes lignes (TGV)', value: 0.009, unit: 'kgCO2e/km', source: 'Base Empreinte ADEME 2024' },
    ],
  },
  {
    name: 'Énergie',
    slug: 'energie',
    emissions: [
      { label: 'Électricité (mix France)', value: 0.052, unit: 'kgCO2e/kWh', source: 'Base Empreinte ADEME 2024' },
      { label: 'Gaz naturel (réseau)', value: 0.227, unit: 'kgCO2e/kWh', source: 'Base Empreinte ADEME 2024' },
      { label: 'Fioul domestique', value: 0.324, unit: 'kgCO2e/kWh', source: 'Base Empreinte ADEME 2024' },
    ],
  },
  {
    name: 'Agriculture',
    slug: 'agriculture',
    emissions: [
      { label: 'Viande de bœuf (France)', value: 27.0, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
      { label: 'Lait de vache (France)', value: 1.32, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
      { label: 'Blé tendre (France)', value: 0.53, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
    ],
  },
  {
    name: 'Industrie',
    slug: 'industrie',
    emissions: [
      { label: 'Acier (production primaire)', value: 2.16, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
      { label: 'Ciment Portland', value: 0.93, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
      { label: 'Aluminium primaire', value: 11.5, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
    ],
  },
  {
    name: 'Bâtiment',
    slug: 'batiment',
    emissions: [
      { label: 'Béton (C25/30)', value: 0.132, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
      { label: 'Laine de verre (isolation)', value: 1.28, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
      { label: 'Brique terre cuite', value: 0.23, unit: 'kgCO2e/kg', source: 'Base Empreinte ADEME 2024' },
    ],
  },
];

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to database.');

  const sectorRepo = AppDataSource.getRepository(Sector);
  const emissionRepo = AppDataSource.getRepository(Emission);

  for (const data of SEED_DATA) {
    const existing = await sectorRepo.findOneBy({ slug: data.slug });
    if (existing) {
      console.log(`Sector "${data.name}" already exists, skipping.`);
      continue;
    }

    const sector = sectorRepo.create({ name: data.name, slug: data.slug });
    await sectorRepo.save(sector);
    console.log(`Inserted sector: ${sector.name} (${sector.id})`);

    for (const e of data.emissions) {
      const emission = emissionRepo.create({ ...e, sectorId: sector.id });
      await emissionRepo.save(emission);
      console.log(`  └─ ${emission.label}: ${emission.value} ${emission.unit}`);
    }
  }

  await AppDataSource.destroy();
  console.log('\nSeed completed.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
