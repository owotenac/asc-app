import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// ---- Types ----

type BodyItemType = {
  type: "text" | "link" | "bullet";
  value: string;
  href?: string;
  bold?: boolean;
};

type BlockType = {
  heading: string;
  body: BodyItemType[];
};

type SectionType = {
  id: string;
  title: string;
  num: string;
  content: BlockType[];
};

// ---- Données ----

const SECTIONS: SectionType[] = [
  {
    id: "mentions",
    title: "Mentions légales",
    num: "1",
    content: [
      {
        heading: "Éditeur",
        body: [
          { type: "text", value: "AS Canet", bold: true },
          { type: "text", value: "E2 Digital Studio" },
          { type: "link", value: "www.e2digitalstudio.com", href: "https://www.e2digitalstudio.com" },
          { type: "link", value: "contact@e2digitalstudio.com", href: "mailto:contact@e2digitalstudio.com" },

        ],
      },
      {
        heading: "Hébergement",
        body: [
          { type: "link", value: "https://www.ascanet.fr", href: "https://www.ascanet.fr" },
        ],
      },
      {
        heading: "Propriété intellectuelle",
        body: [
          {
            type: "text",
            value:
              "L'ensemble des contenus présents sur l'application AS Canet (textes, images, logos) sont la propriété exclusive de leur auteur et protégés par le droit d'auteur. Toute reproduction sans autorisation écrite est interdite.",
          },
        ],
      },
      {
        heading: "Responsabilité",
        body: [
          {
            type: "text",
            value:
              "AS Canet s'efforce de fournir des informations exactes et à jour. L'exactitude des données relève de la responsabilité du District de l'Herault et de la Ligue Occitanie. AS Canet ne peut être tenu responsable d'erreurs ou de changements depuis la publication.",
          },
        ],
      },
      {
        heading: "Sources des données",
        body: [
          {
            type: "text",
            value:
              "Les données sportives présentées dans cette application (résultats, classements, compositions d'équipes, calendriers de matchs, etc.) sont issues des informations publiées par le District de Football de l'Hérault et la Ligue de Football de l'Occitanie, organismes officiels chargés de l'organisation et de la gestion des compétitions de football amateur sur leur territoire respectif.",
          },
          {
            type: "text",
            value:
              "Ces données sont collectées à titre informatif dans le but de faciliter l'accès aux informations sportives pour les clubs, joueurs et supporters. Cette application est mise à disposition gratuitement et ne poursuit aucun but commercial. Elle ne revendique aucun droit de propriété sur ces données et s'engage à en faire un usage strictement non commercial.",
          },
          { type: "link", value: "District de l'Herault", href: "https://herault.fff.fr/" },
          { type: "link", value: "Ligue Occitanie", href: "https://occitanie.fff.fr/" },
        ],
      },
    ],
  },
  {
    id: "confidentialite",
    title: "Politique de confidentialité",
    num: "2",
    content: [
      {
        heading: "Données collectées",
        body: [
          { type: "bullet", value: "Cette application ne collecte aucune donnée personnelle de ses utilisateurs. Nous ne procédons à aucun enregistrement de compte, aucun suivi de navigation, aucun cookie, et aucune collecte d'informations d'identification." },
        ],
      },
      {
        heading: "Vos droits (RGPD)",
        body: [
          {
            type: "text",
            value:
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour exercer ces droits, écrivez à : ",
          },
          { type: "link", value: "contact@e2digitalstudio.com", href: "mailto:contact@e2digitalstudio.com" },
        ],
      },
      {
        heading: "Partage des données",
        body: [
          {
            type: "text",
            value: "Aucune donnée personnelle n'étant collectée, aucun partage avec des tiers n'est effectué.",
          },
        ],
      },
      {
        heading: "Données tierces",
        body: [
          {
            type: "text",
            value:
              "Les données sportives affichées dans l'application proviennent du District de Football de l'Hérault et de la Ligue de Football de l'Occitanie. Nous vous invitons à consulter leurs politiques de confidentialité respectives pour toute question relative aux données qu'ils publient.",
          },
        ],
      },
      {
        heading: "Modifications",
        body: [
          {
            type: "text",
            value:
              "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée directement dans l'application.",
          },
        ],
      },
      {
        heading: "Cookies",
        body: [
          {
            type: "text",
            value:
              "La version web peut déposer des cookies fonctionnels et analytiques. Vous pouvez les refuser via les paramètres de votre navigateur.",
          },
        ],
      },
    ],
  },
  {
  id: "cgu",
  title: "Conditions générales d'utilisation",
  num: "3",
  content: [
    {
      heading: "Objet",
      body: [
        {
          type: "text",
          value:
            "Cette application mobile et web permet de consulter les résultats, classements, calendriers et informations relatives aux compétitions de football organisées par le District de Football de l'Hérault et la Ligue de Football de l'Occitanie. L'accès à l'application est entièrement gratuit.",
        },
      ],
    },
    {
      heading: "Utilisation",
      body: [
        { type: "bullet", value: "L'application est réservée à un usage personnel et non commercial." },
        { type: "bullet", value: "Il est interdit de scraper, copier ou redistribuer les contenus sans accord préalable." },
        { type: "bullet", value: "Les données sportives présentées sont susceptibles d'évoluer sans préavis." },
        { type: "bullet", value: "L'application ne permet pas la création de compte utilisateur et ne collecte aucune donnée personnelle." },
      ],
    },
    {
      heading: "Sources des données",
      body: [
        {
          type: "text",
          value:
            "Les données sportives affichées dans l'application (résultats, classements, compositions d'équipes, calendriers de matchs) proviennent des informations publiées par le District de Football de l'Hérault et la Ligue de Football de l'Occitanie. L'utilisateur est informé que ces données sont publiques et peuvent être inexactes ou obsolètes. L'application ne garantit pas leur exactitude et décline toute responsabilité en cas d'erreur ou d'omission.",
        },
      ],
    },
    {
      heading: "Disponibilité",
      body: [
        {
          type: "text",
          value:
            "L'application est accessible gratuitement et sans engagement. Nous ne garantissons pas une disponibilité continue du service et nous réservons le droit de le suspendre ou de le modifier à tout moment, notamment pour des raisons de maintenance ou d'évolution technique.",
        },
      ],
    },
    {
      heading: "Droit applicable",
      body: [
        {
          type: "text",
          value:
            "Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux compétents sont ceux du ressort du domicile de l'éditeur de l'application.",
        },
      ],
    },
    {
      heading: "Modification des CGU",
      body: [
        {
          type: "text",
          value:
            "Nous nous réservons le droit de modifier les présentes CGU à tout moment. La version en vigueur est celle accessible depuis l'application ou ce site.",
        },
      ],
    },
  ],
},];
// ---- Composants ----

function BodyItem({ item }: { item: BodyItemType }) {
  if (item.type === "link") {
    return (
      <Pressable onPress={() => Linking.openURL(item.href ?? "")}>
        <Text style={styles.link}>{item.value}</Text>
      </Pressable>
    );
  }
  if (item.type === "bullet") {
    return (
      <View style={styles.bulletRow}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>{item.value}</Text>
      </View>
    );
  }
  return (
    <Text style={[styles.bodyText, item.bold === true && styles.bodyBold]}>
      {item.value}
    </Text>
  );
}

function LegalBlock({ block }: { block: BlockType }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockHeading}>{block.heading}</Text>
      {block.body.map((item, i) => (
        <BodyItem key={i} item={item} />
      ))}
    </View>
  );
}

function LegalSection({ section }: { section: SectionType }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNum}>
          <Text style={styles.sectionNumText}>{section.num}</Text>
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      {section.content.map((block, i) => (
        <LegalBlock key={i} block={block} />
      ))}
    </View>
  );
}

// ---- Page principale ----

export default function LegalPage() {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.content}>
          {SECTIONS.map((section) => (
            <LegalSection key={section.id} section={section} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} AS Canet
          </Text>
          <Text style={styles.headerDate}>Dernière mise à jour : {today}</Text>
          <Pressable onPress={() => Linking.openURL("mailto:contact@e2digitalstudio.com")}>
            <Text style={styles.footerLink}>contact@e2digitalstudio.com</Text>
          </Pressable>
        </View>

      </ScrollView>
    </>
  );
}

// ---- Styles ----

const ORANGE = "#e07b39";
const DARK = "#001a01";
const CREAM = "#f0e6d3";
const TAUPE = "#c9a97a";
const BG = "#faf7f2";
const TEXT_COLOR = "#4a3a2a";
const BORDER = "#e8ddd0";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  contentContainer: {
    flexGrow: 1,
  },

  // Header
  header: {
    backgroundColor: DARK,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCircleText: {
    fontWeight: "700",
    fontSize: 16,
    color: DARK,
  },
  headerName: {
    fontSize: 22,
    fontWeight: "700",
    color: CREAM,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 3,
    color: TAUPE,
    marginBottom: 6,
  },
  headerDate: {
    fontSize: 13,
    color: "rgba(240,230,211,0.4)",
  },

  // Contenu
  content: {
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },

  // Section
  section: {
    marginBottom: 56,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: BORDER,
  },
  sectionNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionNumText: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: DARK,
    flex: 1,
  },

  // Block
  block: {
    marginBottom: 24,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: BORDER,
  },
  blockHeading: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: ORANGE,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 26,
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  bodyBold: {
    fontWeight: "700",
  },
  link: {
    fontSize: 15,
    lineHeight: 26,
    color: ORANGE,
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 15,
    color: ORANGE,
    lineHeight: 26,
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 26,
    color: TEXT_COLOR,
    flex: 1,
  },

  // Footer
  footer: {
    backgroundColor: DARK,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: "rgba(240,230,211,0.4)",
  },
  footerLink: {
    fontSize: 13,
    color: TAUPE,
  },
});