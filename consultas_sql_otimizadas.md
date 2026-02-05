# Consultas SQL – Versões Otimizadas

Este arquivo reúne consultas SQL otimizadas, com foco em legibilidade,
boas práticas e previsibilidade dos resultados.

---

## 1️⃣ Trazer apenas os 12 primeiros produtos
```sql
SELECT *
FROM produtos
ORDER BY id ASC
LIMIT 12;
```

---

## 2️⃣ Trazer apenas produtos que comecem com a letra "a"
```sql
SELECT *
FROM produtos
WHERE titulo LIKE 'a%';
```

---

## 3️⃣ Trazer apenas produtos que tenham o preço de 410
```sql
SELECT *
FROM produtos
WHERE preco = 410;
```

---

## 4️⃣ Trazer apenas produtos com avaliação 4 e 5
```sql
SELECT *
FROM produtos
WHERE avaliacao IN (4, 5);
```

---

## 5️⃣ Trazer apenas produtos com avaliação 1 e 5
```sql
SELECT *
FROM produtos
WHERE avaliacao IN (1, 5);
```

---

## 6️⃣ Trazer apenas produtos entre id 21 e 32
```sql
SELECT *
FROM produtos
WHERE id BETWEEN 21 AND 32;
```

---

## 7️⃣ Trazer apenas os 12 últimos produtos
```sql
SELECT *
FROM produtos
ORDER BY id DESC
LIMIT 12;
```

---

## 8️⃣ Trazer apenas os 12 primeiros produtos com avaliação 5
```sql
SELECT *
FROM produtos
WHERE avaliacao = 5
ORDER BY id ASC
LIMIT 12;
```

---

## 9️⃣ Trazer todos os produtos em ordem de preço do menor para o maior
```sql
SELECT *
FROM produtos
ORDER BY preco ASC;
```

---

## 🔟 Trazer todos os produtos em ordem de avaliação do menor para o maior
```sql
SELECT *
FROM produtos
ORDER BY avaliacao ASC;
```

---

📌 **Boas práticas aplicadas**
- Uso de `ORDER BY` junto com `LIMIT`
- Preferência por `IN` ao invés de múltiplos `OR`
- Uso de `BETWEEN` para intervalos
- Tipos de dados respeitados
- Queries mais legíveis e fáceis de manter
