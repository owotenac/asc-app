import { CategoryProps } from '@/constants/CategoryProps';
import { useAppStore } from '@/constants/filter';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Détermine le tag et sa couleur selon le nom de la catégorie
function getCategoryTag(name: string): { label: string; color: string; bg: string } {
  const n = name.toLowerCase();
  if (n.includes('fém') || n.includes('fem'))
    return { label: 'Féminines', color: '#f472b6', bg: 'rgba(244,114,182,0.12)' };
  if (n.includes('u12'))
    return { label: 'Foot 8', color: '#fbbf24', bg: 'rgba(129,140,248,0.12)' };
  if (n.includes('u13'))
    return { label: 'Foot 8', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' };
  if (n.includes('u15'))
    return { label: 'U15', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' };
  if (n.includes('u17'))
    return { label: 'U17', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' };
  if (n.includes('u18') || n.includes('u19'))
    return { label: 'U18', color: '#818cf8', bg: 'rgba(251,191,36,0.12)' };
  // Seniors par défaut
  return { label: 'Seniors', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' };
}

export function TeamCard(props: CategoryProps) {
  const router = useRouter();
  const { setCategoryProps } = useAppStore();

  const openDetails = () => {
    setCategoryProps(props);
    router.push({ pathname: '/team-details' });
  };

  const tag = getCategoryTag(props.cp_name);

  return (
    <TouchableOpacity onPress={openDetails} activeOpacity={0.75}>
      <View style={styles.card}>

        {/* Tag */}
        <View style={[styles.tag, { backgroundColor: tag.bg }]}>
          <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
        </View>

        {/* Nom */}
        <Text style={styles.name} numberOfLines={2}>{props.cp_name}</Text>

        {/* Phase / Poule */}
        <Text style={styles.sub}>Phase {props.cp_phase} · {props.cp_poule_name}</Text>

        {/* Flèche */}
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>›</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111a13',
    borderWidth: 0.5,
    borderColor: '#436845',
    borderRadius: 14,
    padding: 14,
    paddingBottom: 36,
    overflow: 'hidden',
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginBottom: 9,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  name: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4,
    fontFamily: 'LatoRegular',
  },
  sub: {
    color: 'rgba(255, 255, 255, 0.53)',
    fontSize: 11,
  },
  arrow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 22,
    height: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 16,
    lineHeight: 20,
  },
});