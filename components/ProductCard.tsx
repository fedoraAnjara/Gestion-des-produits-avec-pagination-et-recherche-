import { View, Text, StyleSheet } from 'react-native';

export function ProductCard({ product }: { product: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} $</Text>
      <Text style={styles.category}>{product.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '600' },
  price: { color: '#2563eb', marginTop: 4 },
  category: { fontSize: 12, color: '#888', marginTop: 2 },
});