const API_BASE = '/api';

export interface UserFeatures {
  interest_team_vs_individual: number;
  interest_outdoor_preference: number;
  interest_competition_drive: number;
  interest_risk_tolerance: number;
  interest_creative_expression: number;
  interest_social_enjoyment: number;
  interest_endurance_interest: number;
  interest_power_interest: number;
  interest_speed_agility_interest: number;
  interest_spectator_engagement: number;
  interest_ambition_level: number;
  interest_strategy_preference: number;
  strength_endurance_self: number;
  strength_strength_self: number;
  strength_speed_self: number;
  strength_flexibility_self: number;
  strength_coordination_self: number;
  strength_agility_self: number;
  strength_reaction_time_self: number;
  strength_strategy_self: number;
  age: number;
  height_cm: number;
  weight_kg: number;
  sprint_100m_s: number;
  jump_cm: number;
  gender: string;
  region: string;
  facility_access: number;
}

export interface SportRecommendation {
  sport_id: string;
  sport_name: string;
  score: number;
  rank: number;
  is_discovery: boolean;
}

export interface FeatureImportance {
  [key: string]: { percentage: number; label: string };
}

export interface RecommendResponse {
  play_recommendations: SportRecommendation[];
  watch_recommendations: SportRecommendation[];
  discovery_recommendations: SportRecommendation[];
  feature_importance: FeatureImportance;
}

export interface RecommendRequest {
  features: UserFeatures;
  tried_sports: string[];
  top_k: number;
}

export async function getRecommendations(req: RecommendRequest): Promise<RecommendResponse> {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface SportInfo {
  sport_id: string;
  display_name: string;
}

export async function getSports(): Promise<SportInfo[]> {
  const res = await fetch(`${API_BASE}/sports`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const DEFAULT_FEATURES: UserFeatures = {
  interest_team_vs_individual: 3,
  interest_outdoor_preference: 3,
  interest_competition_drive: 3,
  interest_risk_tolerance: 3,
  interest_creative_expression: 3,
  interest_social_enjoyment: 3,
  interest_endurance_interest: 3,
  interest_power_interest: 3,
  interest_speed_agility_interest: 3,
  interest_spectator_engagement: 3,
  interest_ambition_level: 3,
  interest_strategy_preference: 3,
  strength_endurance_self: 3,
  strength_strength_self: 3,
  strength_speed_self: 3,
  strength_flexibility_self: 3,
  strength_coordination_self: 3,
  strength_agility_self: 3,
  strength_reaction_time_self: 3,
  strength_strategy_self: 3,
  age: 22,
  height_cm: 170,
  weight_kg: 70,
  sprint_100m_s: 14,
  jump_cm: 40,
  gender: 'male',
  region: 'south_asia',
  facility_access: 3,
};

export const INTEREST_FIELDS: { key: keyof UserFeatures; label: string; low: string; high: string }[] = [
  { key: 'interest_team_vs_individual', label: 'Team vs Individual', low: 'Solo', high: 'Team' },
  { key: 'interest_outdoor_preference', label: 'Environment', low: 'Indoor', high: 'Outdoor' },
  { key: 'interest_competition_drive', label: 'Competition Drive', low: 'Casual', high: 'Competitive' },
  { key: 'interest_risk_tolerance', label: 'Risk Tolerance', low: 'Safe', high: 'Thrill-seeking' },
  { key: 'interest_creative_expression', label: 'Creative Expression', low: 'Routine', high: 'Creative' },
  { key: 'interest_social_enjoyment', label: 'Social Enjoyment', low: 'Solitary', high: 'Social' },
  { key: 'interest_endurance_interest', label: 'Endurance Interest', low: 'Low', high: 'High' },
  { key: 'interest_power_interest', label: 'Power Interest', low: 'Low', high: 'High' },
  { key: 'interest_speed_agility_interest', label: 'Speed & Agility', low: 'Low', high: 'High' },
  { key: 'interest_spectator_engagement', label: 'Spectator Interest', low: 'Not a fan', high: 'Avid watcher' },
  { key: 'interest_ambition_level', label: 'Ambition Level', low: 'Recreational', high: 'Competitive' },
  { key: 'interest_strategy_preference', label: 'Strategy Preference', low: 'Physical', high: 'Strategic' },
];

export const STRENGTH_FIELDS: { key: keyof UserFeatures; label: string }[] = [
  { key: 'strength_endurance_self', label: 'Endurance' },
  { key: 'strength_strength_self', label: 'Strength' },
  { key: 'strength_speed_self', label: 'Speed' },
  { key: 'strength_flexibility_self', label: 'Flexibility' },
  { key: 'strength_coordination_self', label: 'Coordination' },
  { key: 'strength_agility_self', label: 'Agility' },
  { key: 'strength_reaction_time_self', label: 'Reaction Time' },
  { key: 'strength_strategy_self', label: 'Strategic Ability' },
];
