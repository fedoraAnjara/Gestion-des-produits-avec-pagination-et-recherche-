import { useState, useEffect, useRef } from 'react';
import {View, Text, TextInput, FlatList,TouchableOpacity, ActivityIndicator,StyleSheet, SafeAreaView} from 'react-native';
import { ProductCard } from '../../components/ProductCard';
const LIMIT = 10;
const BASE_URL = 'https://dummyjson.com/products';

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const skip = (page - 1) * LIMIT;
    const url = search ? `${BASE_URL}/search?limit=${LIMIT}&skip=${skip}&q=${search}`: `${BASE_URL}?limit=${LIMIT}&skip=${skip}`;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  function handleSearchChange(text: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setSearch(text);
    }, 500);
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <SafeAreaView style={styles.container}>

      {/* Barre de recherche */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher un produit..."
        onChangeText={handleSearchChange}
        clearButtonMode="while-editing"
      />

      {/* Liste */}
      {loading
        ? <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        : <FlatList
            data={products}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ProductCard product={item} />}
          />
      }

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage(p => p - 1)}
          disabled={page === 1}
          style={[styles.btn, page === 1 && styles.disabled]}
        >
          <Text style={styles.btnText}>← Précédent</Text>
        </TouchableOpacity>

        <Text>Page {page} / {totalPages}</Text>

        <TouchableOpacity
          onPress={() => setPage(p => p + 1)}
          disabled={page === totalPages}
          style={[styles.btn, page === totalPages && styles.disabled]}
        >
          <Text style={styles.btnText}>Suivant →</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  btn: { padding: 10, backgroundColor: '#2563eb', borderRadius: 8 },
  disabled: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontWeight: '600' },
});