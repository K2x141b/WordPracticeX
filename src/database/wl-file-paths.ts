export type LangKeys =
  | "Deutsch_Meinklett_OSD_2"
  | "Englisch_Meinklett_OSD_1"
  | "Englisch_Meinklett_Prim_3"
  | "Französisch_DisDonc_OSD_3"
  | "Französisch_DisDonc_Prim_11"
  | "Französisch_Meinklett_Prim_19"
  | "NT_WordPracticeX_OSD_1";

export type WLGroup = {
  settings: [string, string];
  paths: string[];
};

export const wlFilePaths: Record<LangKeys, WLGroup> = {
  Deutsch_Meinklett_OSD_2: {
    settings: ["Google Deutsch", "de-DE"],
    paths: ["Pluralformen|32", "Test1|14"],
  },
  Französisch_DisDonc_OSD_3: {
    settings: ["Google français", "fr-FR"],
    paths: ["Unité_1_Lernziel_1|17", "Unité_1_Lernziel_2|25", "Unité_1_Lernziel_3|31"],
  },
  Englisch_Meinklett_OSD_1: { settings: ["Google US English", "en-US"], paths: ["unit_1|42"] },
  Französisch_Meinklett_Prim_19: {
    settings: ["Google français", "fr-FR"],
    paths: [
      "tester|3",
      "langage_de_classe_year1|8",
      "year1_unit1|31",
      "year1_unit2|33",
      "year1_unit3|32",
      "year1_unit4|32",
      "year2_unit1|32",
      "year2_unit2|31",
      "year2_unit3|34",
      "year2_unit4|33",
      "langage_de_classe_year2|12",
      "year3_unit1|30",
      "year3_unit3|29",
      "year3_unit|34",
      "year4_unit1|39",
      "year4_unit2|34",
      "year4_unit3|30",
      "year4_unit4|30",
      "french_verbs|28",
    ],
  },
  Französisch_DisDonc_Prim_11: {
    settings: ["Google français", "fr-FR"],
    paths: [
      "Faire_mes_devoirs|12",
      "Habiter|6",
      "La_famille|14",
      "Le_temps|8",
      "Les_aliments|24",
      "Les_animaux|9",
      "Les_couleurs|10",
      "Les_jours_de_la_semaine|8",
      "Les_loisirs|22",
      "Les_matières_scolaires|14",
      "Porter_des_vêtements|15",
    ],
  },
  Englisch_Meinklett_Prim_3: {
    settings: ["Google US English", "en-US"],
    paths: ["test1|40", "unit_house|33", "unit_3|36"],
  },
  NT_WordPracticeX_OSD_1: {
    settings: ["Google Deutsch", "de-DE"],
    paths: ["Knochen|27"],
  },
};
