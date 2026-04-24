const mongoose = require('mongoose');

const ESGSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String },
  company: { type: String, required: true },
  industry: { type: String, required: true },
  employees: { type: Number, required: true },
  // Environmental
  energyConsumption: { type: Number }, // kWh/year
  renewableEnergyPct: { type: Number },
  wasteGenerated: { type: Number }, // tonnes/year
  waterUsage: { type: Number }, // litres/year
  carbonEmissions: { type: Number }, // tonnes CO2
  // Social
  localHiringPct: { type: Number },
  trainingHoursPerEmployee: { type: Number },
  diversityRatio: { type: Number },
  safetyIncidents: { type: Number },
  // Governance
  boardDiversityPct: { type: Number },
  auditFrequency: { type: String },
  codeOfConductExists: { type: Boolean },
  supplierScreeningPct: { type: Number },
  // Scores
  environmentalScore: { type: Number },
  socialScore: { type: Number },
  governanceScore: { type: Number },
  totalESGScore: { type: Number },
  maturityLevel: { type: String },
  recommendations: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ESGAssessment', ESGSchema);
