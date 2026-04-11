export type Lang = 'en' | 'si' | 'ta';

export interface Translations {
  /* ── Nav ─────────────────────────────────── */
  nav_brand: string;
  nav_github: string;

  /* ── Landing ─────────────────────────────── */
  landing_badge: string;
  landing_headline_1: string;
  landing_headline_2: string;
  landing_body: string;
  landing_cta: string;

  feature_1_title: string;
  feature_1_desc: string;
  feature_2_title: string;
  feature_2_desc: string;
  feature_3_title: string;
  feature_3_desc: string;

  footer_credit: string;

  /* ── Questionnaire steps ─────────────────── */
  step_interests: string;
  step_strengths: string;
  step_physical: string;
  step_demographics: string;

  step_interests_subtitle: string;
  step_strengths_subtitle: string;
  step_physical_subtitle: string;
  step_demographics_subtitle: string;

  btn_back: string;
  btn_continue: string;
  btn_reveal: string;
  btn_analysing: string;
  btn_return_home: string;

  /* ── Interest field labels & poles ───────── */
  interest_team_vs_individual: string;
  interest_team_vs_individual_low: string;
  interest_team_vs_individual_high: string;

  interest_outdoor_preference: string;
  interest_outdoor_preference_low: string;
  interest_outdoor_preference_high: string;

  interest_competition_drive: string;
  interest_competition_drive_low: string;
  interest_competition_drive_high: string;

  interest_risk_tolerance: string;
  interest_risk_tolerance_low: string;
  interest_risk_tolerance_high: string;

  interest_creative_expression: string;
  interest_creative_expression_low: string;
  interest_creative_expression_high: string;

  interest_social_enjoyment: string;
  interest_social_enjoyment_low: string;
  interest_social_enjoyment_high: string;

  interest_endurance_interest: string;
  interest_power_interest: string;
  interest_speed_agility_interest: string;
  interest_spectator_engagement: string;
  interest_spectator_engagement_low: string;
  interest_spectator_engagement_high: string;
  interest_ambition_level: string;
  interest_ambition_level_low: string;
  interest_ambition_level_high: string;
  interest_strategy_preference: string;
  interest_strategy_preference_low: string;
  interest_strategy_preference_high: string;

  pole_low: string;
  pole_high: string;

  /* ── Strength field labels ───────────────── */
  strength_endurance: string;
  strength_strength: string;
  strength_speed: string;
  strength_flexibility: string;
  strength_coordination: string;
  strength_agility: string;
  strength_reaction_time: string;
  strength_strategy: string;

  /* ── Physical fields ─────────────────────── */
  field_age: string;
  field_age_unit: string;
  field_height: string;
  field_height_unit: string;
  field_weight: string;
  field_weight_unit: string;
  field_sprint: string;
  field_sprint_unit: string;
  field_jump: string;
  field_jump_unit: string;

  /* ── Demographics ────────────────────────── */
  label_gender: string;
  gender_male: string;
  gender_female: string;
  gender_other: string;

  label_region: string;
  region_south_asia: string;
  region_east_asia: string;
  region_europe: string;
  region_americas: string;
  region_africa: string;
  region_oceania: string;

  label_facility: string;
  facility_low: string;
  facility_high: string;

  label_tried_sports: string;
  tried_optional: string;

  /* ── Results ─────────────────────────────── */
  results_heading: string;
  results_subtitle: string;
  results_play_title: string;
  results_play_subtitle: string;
  results_watch_title: string;
  results_watch_subtitle: string;
  results_discovery_title: string;
  results_discovery_subtitle: string;
  results_importance_title: string;
  results_importance_subtitle: string;
  btn_retake: string;

  /* ── Sport names ─────────────────────────── */
  sport_football_soccer: string;
  sport_cricket: string;
  sport_basketball: string;
  sport_tennis: string;
  sport_badminton: string;
  sport_table_tennis: string;
  sport_volleyball: string;
  sport_swimming: string;
  sport_athletics_track: string;
  sport_cycling: string;
  sport_martial_arts: string;
  sport_boxing: string;
  sport_gymnastics: string;
  sport_archery: string;
  sport_rock_climbing: string;
  sport_rugby: string;
  sport_weightlifting: string;
  sport_esports: string;
  sport_skateboarding: string;
  sport_rowing: string;

  /* ── Feature importance labels ───────────── */
  importance_interests: string;
  importance_strengths: string;
  importance_physical: string;
  importance_demographics: string;

  /* ── Discovery badge ─────────────────────── */
  badge_new: string;
}

/* ════════════════════════════════════════════
   ENGLISH
════════════════════════════════════════════ */
const en: Translations = {
  nav_brand: 'SportRec',
  nav_github: 'GitHub',

  landing_badge: 'Accepted · ICDSIAI-26',
  landing_headline_1: 'Discover Your',
  landing_headline_2: 'Perfect Sport',
  landing_body:
    'AI-powered recommendations shaped by your personal interests, self-rated strengths, and physical profile — not just athletic metrics. Built on a stacking ensemble with a novel-sport discovery mechanism.',
  landing_cta: 'Begin Your Profile',

  feature_1_title: 'Interest-Driven',
  feature_1_desc:
    'Goes beyond physical tests — your passions, motivations, and personality shape every recommendation.',
  feature_2_title: 'Stacking Ensemble',
  feature_2_desc:
    'XGBoost + Random Forest combined via a logistic regression meta-learner. 17.4% NDCG improvement over baselines.',
  feature_3_title: 'Sport Discovery',
  feature_3_desc:
    'Cosine similarity reveals sports you never considered but would love. 85.7% novelty rate in validation.',

  footer_credit: 'Pabasara W.G.K. — University of Moratuwa, Dept. of CSE',

  step_interests: 'Interests',
  step_strengths: 'Strengths',
  step_physical: 'Physical',
  step_demographics: 'Demographics',

  step_interests_subtitle: 'Rate your preferences on each dimension (I = lowest, V = highest)',
  step_strengths_subtitle: 'How would you honestly rate your own athletic abilities?',
  step_physical_subtitle: 'Enter your approximate physical measurements',
  step_demographics_subtitle: 'Final details to personalise your results',

  btn_back: 'Back',
  btn_continue: 'Continue',
  btn_reveal: 'Reveal Results',
  btn_analysing: 'Analysing',
  btn_return_home: 'Return to Home',

  interest_team_vs_individual: 'Team vs Individual',
  interest_team_vs_individual_low: 'Solo',
  interest_team_vs_individual_high: 'Team',
  interest_outdoor_preference: 'Environment',
  interest_outdoor_preference_low: 'Indoor',
  interest_outdoor_preference_high: 'Outdoor',
  interest_competition_drive: 'Competition Drive',
  interest_competition_drive_low: 'Casual',
  interest_competition_drive_high: 'Competitive',
  interest_risk_tolerance: 'Risk Tolerance',
  interest_risk_tolerance_low: 'Safe',
  interest_risk_tolerance_high: 'Thrill-seeking',
  interest_creative_expression: 'Creative Expression',
  interest_creative_expression_low: 'Routine',
  interest_creative_expression_high: 'Creative',
  interest_social_enjoyment: 'Social Enjoyment',
  interest_social_enjoyment_low: 'Solitary',
  interest_social_enjoyment_high: 'Social',
  interest_endurance_interest: 'Endurance Interest',
  interest_power_interest: 'Power Interest',
  interest_speed_agility_interest: 'Speed & Agility',
  interest_spectator_engagement: 'Spectator Interest',
  interest_spectator_engagement_low: 'Not a fan',
  interest_spectator_engagement_high: 'Avid watcher',
  interest_ambition_level: 'Ambition Level',
  interest_ambition_level_low: 'Recreational',
  interest_ambition_level_high: 'Competitive',
  interest_strategy_preference: 'Strategy Preference',
  interest_strategy_preference_low: 'Physical',
  interest_strategy_preference_high: 'Strategic',
  pole_low: 'Low',
  pole_high: 'High',

  strength_endurance: 'Endurance',
  strength_strength: 'Strength',
  strength_speed: 'Speed',
  strength_flexibility: 'Flexibility',
  strength_coordination: 'Coordination',
  strength_agility: 'Agility',
  strength_reaction_time: 'Reaction Time',
  strength_strategy: 'Strategic Ability',

  field_age: 'Age',
  field_age_unit: 'years',
  field_height: 'Height',
  field_height_unit: 'cm',
  field_weight: 'Weight',
  field_weight_unit: 'kg',
  field_sprint: '100m Sprint',
  field_sprint_unit: 'sec',
  field_jump: 'Standing Jump',
  field_jump_unit: 'cm',

  label_gender: 'Gender',
  gender_male: 'Male',
  gender_female: 'Female',
  gender_other: 'Other',

  label_region: 'Region',
  region_south_asia: 'South Asia',
  region_east_asia: 'East Asia',
  region_europe: 'Europe',
  region_americas: 'Americas',
  region_africa: 'Africa',
  region_oceania: 'Oceania',

  label_facility: 'Facility Access',
  facility_low: 'No access',
  facility_high: 'Full gym',

  label_tried_sports: 'Sports already tried',
  tried_optional: 'optional',

  results_heading: 'Your Recommendations',
  results_subtitle: 'Stacking Ensemble · XGBoost + Random Forest · SHAP-analysed',
  results_play_title: 'To Play',
  results_play_subtitle: 'Best sports for active participation',
  results_watch_title: 'To Watch',
  results_watch_subtitle: "Sports you'd love as a spectator",
  results_discovery_title: 'Discover',
  results_discovery_subtitle: "Sports you've never tried — but should (85.7% novelty rate)",
  results_importance_title: 'What Drove Your Results',
  results_importance_subtitle: 'Feature group importance from SHAP analysis — research paper Table V',
  btn_retake: 'Retake Profile',

  sport_football_soccer: 'Football / Soccer',
  sport_cricket: 'Cricket',
  sport_basketball: 'Basketball',
  sport_tennis: 'Tennis',
  sport_badminton: 'Badminton',
  sport_table_tennis: 'Table Tennis',
  sport_volleyball: 'Volleyball',
  sport_swimming: 'Swimming',
  sport_athletics_track: 'Athletics / Track',
  sport_cycling: 'Cycling',
  sport_martial_arts: 'Martial Arts',
  sport_boxing: 'Boxing',
  sport_gymnastics: 'Gymnastics',
  sport_archery: 'Archery',
  sport_rock_climbing: 'Rock Climbing',
  sport_rugby: 'Rugby',
  sport_weightlifting: 'Weightlifting',
  sport_esports: 'Esports',
  sport_skateboarding: 'Skateboarding',
  sport_rowing: 'Rowing',

  importance_interests: 'Personal Interests',
  importance_strengths: 'Self-Rated Strengths',
  importance_physical: 'Physical Metrics',
  importance_demographics: 'Demographics',

  badge_new: 'NEW',
};

/* ════════════════════════════════════════════
   SINHALA (සිංහල)
════════════════════════════════════════════ */
const si: Translations = {
  nav_brand: 'SportRec',
  nav_github: 'GitHub',

  landing_badge: 'ICDSIAI-26 හි පිළිගනු ලැබිණ',
  landing_headline_1: 'ඔබේ',
  landing_headline_2: 'සුදුසු ක්‍රීඩාව සොයා ගන්න',
  landing_body:
    'ඔබේ පෞද්ගලික රුචිකත්වයන්, ස්වයං-ඇගයීම් ශක්තීන් සහ ශාරීරික පැතිකඩ මත පදනම් වූ AI නිර්දේශ — කායික මිමින් පමණක් නොවේ. නව ක්‍රීඩා සොයාගැනීමේ ක්‍රමවේදයක් සහිත ensemble ආදර්ශයක් මත ගොඩනගා ඇත.',
  landing_cta: 'ඔබේ පැතිකඩ ආරම්භ කරන්න',

  feature_1_title: 'රුචිකත්වය මත පදනම්',
  feature_1_desc:
    'ශාරීරික පරීක්ෂණ පමණක් නොව — ඔබේ ආශාවන්, අභිප්‍රේරණයන් සහ පෞරුෂය සෑම නිර්දේශයකම හැඩය ගන්වයි.',
  feature_2_title: 'Stacking Ensemble',
  feature_2_desc:
    'Logistic Regression meta-learner හරහා XGBoost + Random Forest ඒකාබද්ධ කෙරේ. baseline ට වඩා 17.4% NDCG දියුණුවක්.',
  feature_3_title: 'ක්‍රීඩා සොයාගැනීම',
  feature_3_desc:
    'ඔබ කිසිදාක නොසිතූ නමුත් ඔබට ගැළපෙන ක්‍රීඩා Cosine similarity ක්‍රමයෙන් හඳුනාගනී. 85.7% නව්‍යතා අනුපාතය.',

  footer_credit: 'Pabasara W.G.K. — මොරටු විශ්වවිද්‍යාලය, CSE දෙපාර්තමේන්තුව',

  step_interests: 'රුචිකත්වය',
  step_strengths: 'ශක්තීන්',
  step_physical: 'ශාරීරික',
  step_demographics: 'ජනමිතිකය',

  step_interests_subtitle: 'එක් එක් මානයෙහි ඔබේ කැමැත්ත ශ්‍රේණිගත කරන්න (I = අඩුම, V = ඉහළම)',
  step_strengths_subtitle: 'ඔබේ ක්‍රීඩා හැකියාවන් ස්වයං-ඇගයීමෙන් ශ්‍රේණිගත කරන්න',
  step_physical_subtitle: 'ඔබේ ශාරීරික මිම්ම ඇතුළු කරන්න',
  step_demographics_subtitle: 'ඔබේ ප්‍රතිඵල පෞද්ගලීකරණය සඳහා අවසාන විස්තර',

  btn_back: 'ආපසු',
  btn_continue: 'ඉදිරියට',
  btn_reveal: 'ප්‍රතිඵල බලන්න',
  btn_analysing: 'විශ්ලේෂණය කරමින්',
  btn_return_home: 'මුල් පිටුවට',

  interest_team_vs_individual: 'කණ්ඩායම් vs තනි',
  interest_team_vs_individual_low: 'තනි',
  interest_team_vs_individual_high: 'කණ්ඩායම',
  interest_outdoor_preference: 'පරිසරය',
  interest_outdoor_preference_low: 'ගෘහ අභ්‍යන්තර',
  interest_outdoor_preference_high: 'එළිමහන',
  interest_competition_drive: 'තරඟකාරිත්වය',
  interest_competition_drive_low: 'සාමාන්‍ය',
  interest_competition_drive_high: 'තරඟකාරී',
  interest_risk_tolerance: 'අවදානම් ඉවසීම',
  interest_risk_tolerance_low: 'ආරක්ෂිත',
  interest_risk_tolerance_high: 'ත්‍රාසය',
  interest_creative_expression: 'නිර්මාණශීලිත්වය',
  interest_creative_expression_low: 'සාමාන්‍ය',
  interest_creative_expression_high: 'නිර්මාණශීලී',
  interest_social_enjoyment: 'සමාජ සතුට',
  interest_social_enjoyment_low: 'තනිකඩ',
  interest_social_enjoyment_high: 'සාමාජිකත්වය',
  interest_endurance_interest: 'විඳදරාගැනීම',
  interest_power_interest: 'ශක්ති රුචිය',
  interest_speed_agility_interest: 'වේගය සහ චලිතය',
  interest_spectator_engagement: 'ප්‍රේක්ෂක රුචිය',
  interest_spectator_engagement_low: 'රැකිලෙකු නැත',
  interest_spectator_engagement_high: 'ඉහළ රසිකයෙකු',
  interest_ambition_level: 'අභිලාෂ මට්ටම',
  interest_ambition_level_low: 'විනෝදාත්මක',
  interest_ambition_level_high: 'තරඟකාරී',
  interest_strategy_preference: 'උපාය මාර්ග කැමැත්ත',
  interest_strategy_preference_low: 'ශාරීරික',
  interest_strategy_preference_high: 'උපාය මාර්ගික',
  pole_low: 'අඩු',
  pole_high: 'ඉහළ',

  strength_endurance: 'විඳදරාගැනීම',
  strength_strength: 'ශාරීරික ශක්තිය',
  strength_speed: 'වේගය',
  strength_flexibility: 'නම්‍යතාව',
  strength_coordination: 'සම්බන්ධීකරණය',
  strength_agility: 'චලිත හැකියාව',
  strength_reaction_time: 'ප්‍රතිචාර කාලය',
  strength_strategy: 'උපාය හැකියාව',

  field_age: 'වයස',
  field_age_unit: 'අවුරුදු',
  field_height: 'උස',
  field_height_unit: 'සෙ.මී.',
  field_weight: 'බර',
  field_weight_unit: 'කි.ග්‍රෑ.',
  field_sprint: '100m දිවීම',
  field_sprint_unit: 'තත්.',
  field_jump: 'සිටගෙන පනිනු',
  field_jump_unit: 'සෙ.මී.',

  label_gender: 'ලිංගිකත්වය',
  gender_male: 'පුරුෂ',
  gender_female: 'ස්ත්‍රී',
  gender_other: 'වෙනත්',

  label_region: 'කලාපය',
  region_south_asia: 'දකුණු ආසියාව',
  region_east_asia: 'නැගෙනහිර ආසියාව',
  region_europe: 'යුරෝපය',
  region_americas: 'ඇමෙරිකාව',
  region_africa: 'අප්‍රිකාව',
  region_oceania: 'ඕෂනියාව',

  label_facility: 'පහසුකම් ප්‍රවේශය',
  facility_low: 'ප්‍රවේශයක් නැත',
  facility_high: 'සම්පූර්ණ ජිම්',

  label_tried_sports: 'ඔබ උත්සාහ කළ ක්‍රීඩා',
  tried_optional: 'අත්‍යවශ්‍ය නොවේ',

  results_heading: 'ඔබේ නිර්දේශ',
  results_subtitle: 'Stacking Ensemble · XGBoost + Random Forest · SHAP විශ්ලේෂණය',
  results_play_title: 'ක්‍රීඩා කිරීමට',
  results_play_subtitle: 'ක්‍රියාකාරී සහභාගිත්වයට හොඳම ක්‍රීඩා',
  results_watch_title: 'නරඹීමට',
  results_watch_subtitle: 'ප්‍රේක්ෂකයෙකු ලෙස ඔබ ප්‍රිය කරන ක්‍රීඩා',
  results_discovery_title: 'සොයා ගන්න',
  results_discovery_subtitle: 'ඔබ කිසිදාක නොකළ — නමුත් කළ යුතු ක්‍රීඩා (85.7% නව්‍යතාව)',
  results_importance_title: 'ඔබේ ප්‍රතිඵල හේතු',
  results_importance_subtitle: 'SHAP විශ්ලේෂණයෙන් ලක්ෂණ කණ්ඩායම් වැදගත්කම — පර්යේෂණ ලිපිය Table V',
  btn_retake: 'නැවත උත්සාහ කරන්න',

  sport_football_soccer: 'පාපන්දු',
  sport_cricket: 'ක්‍රිකට්',
  sport_basketball: 'බාස්කට්බෝල්',
  sport_tennis: 'ටෙනිස්',
  sport_badminton: 'බැඩ්මින්ටන්',
  sport_table_tennis: 'මේස ටෙනිස්',
  sport_volleyball: 'වොලිබෝල්',
  sport_swimming: 'පිහිනීම',
  sport_athletics_track: 'ශ්ලේෂ්ම / ත්‍රාසජනක',
  sport_cycling: 'බයිසිකල් ක්‍රීඩා',
  sport_martial_arts: 'සටන් කලා',
  sport_boxing: 'බොක්සිං',
  sport_gymnastics: 'ජිම්නාස්ටික්',
  sport_archery: '弓 ව්‍යායාමය',
  sport_rock_climbing: 'ගල් නගිනු',
  sport_rugby: 'රග්බි',
  sport_weightlifting: 'බර ඉසිලීම',
  sport_esports: 'විද්‍යුත් ක්‍රීඩා',
  sport_skateboarding: 'ස්කේට්බෝඩිං',
  sport_rowing: 'දෙය ජය ගැනීම',

  importance_interests: 'පෞද්ගලික රුචිකත්වයන්',
  importance_strengths: 'ස්වයං-ඇගයීම් ශක්තීන්',
  importance_physical: 'ශාරීරික මිම්ම',
  importance_demographics: 'ජනමිතිකය',

  badge_new: 'නව',
};

/* ════════════════════════════════════════════
   TAMIL (தமிழ்)
════════════════════════════════════════════ */
const ta: Translations = {
  nav_brand: 'SportRec',
  nav_github: 'GitHub',

  landing_badge: 'ICDSIAI-26 இல் ஏற்றுக்கொள்ளப்பட்டது',
  landing_headline_1: 'உங்களுக்கான',
  landing_headline_2: 'சரியான விளையாட்டைக் கண்டறியுங்கள்',
  landing_body:
    'உங்கள் தனிப்பட்ட ஆர்வங்கள், சுய-மதிப்பிடப்பட்ட திறன்கள் மற்றும் உடல் அமைப்பின் அடிப்படையில் AI பரிந்துரைகள் — வெறும் உடற்திறன் அளவீடுகள் மட்டுமல்ல. புதிய விளையாட்டு கண்டுபிடிப்பு பொறிமுறையுடன் கூடிய அடுக்கு மாதிரியில் கட்டப்பட்டுள்ளது.',
  landing_cta: 'உங்கள் சுயவிவரத்தை தொடங்குங்கள்',

  feature_1_title: 'ஆர்வம் சார்ந்தது',
  feature_1_desc:
    'உடல் சோதனைகளை மட்டும் தாண்டி — உங்கள் ஆர்வங்கள், உந்துதல்கள் மற்றும் ஆளுமை ஒவ்வொரு பரிந்துரையையும் வடிவமைக்கின்றன.',
  feature_2_title: 'Stacking Ensemble',
  feature_2_desc:
    'Logistic Regression meta-learner மூலம் XGBoost + Random Forest இணைக்கப்பட்டது. அடிப்படை மாதிரிகளை விட 17.4% NDCG மேம்பாடு.',
  feature_3_title: 'விளையாட்டு கண்டுபிடிப்பு',
  feature_3_desc:
    'நீங்கள் ஒருபோதும் சிந்திக்காத ஆனால் விரும்புவீர்கள் என்ற விளையாட்டுகளை Cosine similarity கண்டறிகிறது. 85.7% புதுமை விகிதம்.',

  footer_credit: 'Pabasara W.G.K. — மொராட்டுவா பல்கலைக்கழகம், CSE துறை',

  step_interests: 'ஆர்வங்கள்',
  step_strengths: 'திறன்கள்',
  step_physical: 'உடல் அமைப்பு',
  step_demographics: 'மக்களியல்',

  step_interests_subtitle: 'ஒவ்வொரு பரிமாணத்திலும் உங்கள் விருப்பத்தை மதிப்பிடுங்கள் (I = மிகக் குறைவு, V = மிக அதிகம்)',
  step_strengths_subtitle: 'உங்கள் விளையாட்டு திறன்களை நேர்மையாக மதிப்பிடுங்கள்',
  step_physical_subtitle: 'உங்கள் தோராயமான உடல் அளவீடுகளை உள்ளிடுங்கள்',
  step_demographics_subtitle: 'உங்கள் முடிவுகளை தனிப்பயனாக்க இறுதி விவரங்கள்',

  btn_back: 'பின்செல்',
  btn_continue: 'தொடர்க',
  btn_reveal: 'முடிவுகளை காட்டு',
  btn_analysing: 'பகுப்பாய்வு செய்கிறது',
  btn_return_home: 'முகப்புக்கு திரும்பு',

  interest_team_vs_individual: 'குழு vs தனிநபர்',
  interest_team_vs_individual_low: 'தனிநபர்',
  interest_team_vs_individual_high: 'குழு',
  interest_outdoor_preference: 'சூழல்',
  interest_outdoor_preference_low: 'உள்ளரங்கம்',
  interest_outdoor_preference_high: 'வெளியரங்கம்',
  interest_competition_drive: 'போட்டி உணர்வு',
  interest_competition_drive_low: 'சாதாரணம்',
  interest_competition_drive_high: 'போட்டி மனப்பான்மை',
  interest_risk_tolerance: 'ஆபத்து சகிப்புத்தன்மை',
  interest_risk_tolerance_low: 'பாதுகாப்பு',
  interest_risk_tolerance_high: 'சாகசம்',
  interest_creative_expression: 'படைப்பாற்றல்',
  interest_creative_expression_low: 'சாதாரணம்',
  interest_creative_expression_high: 'படைப்பாற்றல் மிக்கது',
  interest_social_enjoyment: 'சமூக மகிழ்ச்சி',
  interest_social_enjoyment_low: 'தனிமை விரும்பி',
  interest_social_enjoyment_high: 'சமூக விரும்பி',
  interest_endurance_interest: 'சகிப்புத்திறன் ஆர்வம்',
  interest_power_interest: 'சக்தி ஆர்வம்',
  interest_speed_agility_interest: 'வேகம் & சுறுசுறுப்பு',
  interest_spectator_engagement: 'பார்வையாளர் ஆர்வம்',
  interest_spectator_engagement_low: 'ரசிகர் இல்லை',
  interest_spectator_engagement_high: 'தீவிர ரசிகர்',
  interest_ambition_level: 'லட்சிய நிலை',
  interest_ambition_level_low: 'பொழுதுபோக்கு',
  interest_ambition_level_high: 'போட்டி',
  interest_strategy_preference: 'உத்தி விருப்பம்',
  interest_strategy_preference_low: 'உடல் சார்ந்தது',
  interest_strategy_preference_high: 'உத்தி சார்ந்தது',
  pole_low: 'குறைவு',
  pole_high: 'அதிகம்',

  strength_endurance: 'சகிப்புத்திறன்',
  strength_strength: 'உடல் வலிமை',
  strength_speed: 'வேகம்',
  strength_flexibility: 'நெகிழ்வுத்தன்மை',
  strength_coordination: 'ஒருங்கிணைப்பு',
  strength_agility: 'சுறுசுறுப்பு',
  strength_reaction_time: 'எதிர்வினை நேரம்',
  strength_strategy: 'உத்தித் திறன்',

  field_age: 'வயது',
  field_age_unit: 'ஆண்டுகள்',
  field_height: 'உயரம்',
  field_height_unit: 'செ.மீ.',
  field_weight: 'எடை',
  field_weight_unit: 'கி.கி.',
  field_sprint: '100மீ ஓட்டம்',
  field_sprint_unit: 'வி.',
  field_jump: 'நின்று தாவுதல்',
  field_jump_unit: 'செ.மீ.',

  label_gender: 'பாலினம்',
  gender_male: 'ஆண்',
  gender_female: 'பெண்',
  gender_other: 'பிற',

  label_region: 'பிராந்தியம்',
  region_south_asia: 'தென் ஆசியா',
  region_east_asia: 'கிழக்கு ஆசியா',
  region_europe: 'ஐரோப்பா',
  region_americas: 'அமெரிக்காக்கள்',
  region_africa: 'ஆப்பிரிக்கா',
  region_oceania: 'ஓசியானியா',

  label_facility: 'வசதி அணுகல்',
  facility_low: 'வசதி இல்லை',
  facility_high: 'முழு ஜிம்',

  label_tried_sports: 'ஏற்கனவே முயற்சித்த விளையாட்டுகள்',
  tried_optional: 'விருப்பத்தேர்வு',

  results_heading: 'உங்கள் பரிந்துரைகள்',
  results_subtitle: 'Stacking Ensemble · XGBoost + Random Forest · SHAP பகுப்பாய்வு',
  results_play_title: 'விளையாட',
  results_play_subtitle: 'செயலில் பங்கேற்பதற்கான சிறந்த விளையாட்டுகள்',
  results_watch_title: 'பார்க்க',
  results_watch_subtitle: 'பார்வையாளராக நீங்கள் விரும்பும் விளையாட்டுகள்',
  results_discovery_title: 'கண்டறியுங்கள்',
  results_discovery_subtitle: 'நீங்கள் முயற்சிக்காத — ஆனால் முயற்சிக்க வேண்டிய விளையாட்டுகள் (85.7% புதுமை விகிதம்)',
  results_importance_title: 'உங்கள் முடிவுகளுக்கான காரணம்',
  results_importance_subtitle: 'SHAP பகுப்பாய்விலிருந்து அம்ச குழு முக்கியத்துவம் — ஆராய்ச்சி கட்டுரை Table V',
  btn_retake: 'மீண்டும் முயற்சி',

  sport_football_soccer: 'கால்பந்து',
  sport_cricket: 'கிரிக்கெட்',
  sport_basketball: 'கூடைப்பந்து',
  sport_tennis: 'டென்னிஸ்',
  sport_badminton: 'பேட்மிண்டன்',
  sport_table_tennis: 'மேசை டென்னிஸ்',
  sport_volleyball: 'கிடைப்பந்து',
  sport_swimming: 'நீச்சல்',
  sport_athletics_track: 'தடகளம் / ஓட்டம்',
  sport_cycling: 'சைக்கிள் சவாரி',
  sport_martial_arts: 'சண்டைக் கலைகள்',
  sport_boxing: 'குத்துச்சண்டை',
  sport_gymnastics: 'ஜிம்னாஸ்டிக்ஸ்',
  sport_archery: 'வில்வித்தை',
  sport_rock_climbing: 'பாறை ஏறுதல்',
  sport_rugby: 'ரக்பி',
  sport_weightlifting: 'பளுதூக்குதல்',
  sport_esports: 'மின்னணு விளையாட்டுகள்',
  sport_skateboarding: 'ஸ்கேட்போர்டிங்',
  sport_rowing: 'படகு தண்டு வலிக்கும் பந்தயம்',

  importance_interests: 'தனிப்பட்ட ஆர்வங்கள்',
  importance_strengths: 'சுய-மதிப்பிடப்பட்ட திறன்கள்',
  importance_physical: 'உடல் அளவீடுகள்',
  importance_demographics: 'மக்களியல்',

  badge_new: 'புதியது',
};

export const translations: Record<Lang, Translations> = { en, si, ta };

export const LANG_LABELS: Record<Lang, string> = {
  en: 'EN',
  si: 'සිං',
  ta: 'த',
};
