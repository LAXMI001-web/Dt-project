const ESGAssessment = require('../models/ESGAssessment');

const calculateESGScore = (data) => {
  // Environmental Score (0-100)
  let envScore = 50;
  if (data.renewableEnergyPct >= 50) envScore += 20;
  else if (data.renewableEnergyPct >= 25) envScore += 10;
  if (data.carbonEmissions < 100) envScore += 15;
  else if (data.carbonEmissions < 500) envScore += 5;
  else envScore -= 10;
  if (data.wasteGenerated < 10) envScore += 15;
  else if (data.wasteGenerated < 50) envScore += 5;

  // Social Score (0-100)
  let socialScore = 50;
  if (data.localHiringPct >= 70) socialScore += 15;
  else if (data.localHiringPct >= 50) socialScore += 8;
  if (data.trainingHoursPerEmployee >= 40) socialScore += 15;
  else if (data.trainingHoursPerEmployee >= 20) socialScore += 8;
  if (data.diversityRatio >= 40) socialScore += 10;
  else if (data.diversityRatio >= 25) socialScore += 5;
  if (data.safetyIncidents === 0) socialScore += 10;
  else if (data.safetyIncidents < 3) socialScore += 5;

  // Governance Score (0-100)
  let govScore = 50;
  if (data.boardDiversityPct >= 30) govScore += 15;
  if (data.codeOfConductExists) govScore += 20;
  if (data.supplierScreeningPct >= 80) govScore += 15;
  else if (data.supplierScreeningPct >= 50) govScore += 8;

  envScore = Math.min(100, Math.max(0, envScore));
  socialScore = Math.min(100, Math.max(0, socialScore));
  govScore = Math.min(100, Math.max(0, govScore));
  const total = Math.round((envScore * 0.4) + (socialScore * 0.35) + (govScore * 0.25));

  let maturityLevel;
  if (total >= 80) maturityLevel = 'ESG Leader';
  else if (total >= 65) maturityLevel = 'ESG Performer';
  else if (total >= 50) maturityLevel = 'ESG Developer';
  else if (total >= 35) maturityLevel = 'ESG Initiator';
  else maturityLevel = 'ESG Beginner';

  const recommendations = [];
  if (data.renewableEnergyPct < 25) recommendations.push('Increase renewable energy adoption to at least 25% to reduce carbon footprint significantly.');
  if (data.trainingHoursPerEmployee < 20) recommendations.push('Invest in employee training programs – target minimum 20 hours per employee annually.');
  if (!data.codeOfConductExists) recommendations.push('Establish a formal Code of Conduct for all suppliers and business partners.');
  if (data.supplierScreeningPct < 50) recommendations.push('Implement ESG screening for at least 50% of your supplier base.');
  if (data.diversityRatio < 25) recommendations.push('Develop a diversity & inclusion program to achieve at least 25% gender diversity.');
  if (total < 65) recommendations.push('Schedule a comprehensive ESG maturity assessment with Nexara consultants to build a roadmap.');

  return { envScore, socialScore, govScore, total, maturityLevel, recommendations };
};

exports.calculateESG = async (req, res) => {
  try {
    const scores = calculateESGScore(req.body);
    const assessment = await ESGAssessment.create({
      ...req.body,
      user: req.user?.id,
      environmentalScore: scores.envScore,
      socialScore: scores.socialScore,
      governanceScore: scores.govScore,
      totalESGScore: scores.total,
      maturityLevel: scores.maturityLevel,
      recommendations: scores.recommendations
    });
    res.status(201).json({ success: true, assessment, scores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAssessments = async (req, res) => {
  try {
    const assessments = await ESGAssessment.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, assessments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
