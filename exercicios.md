```sql
1- trazer apenas 12 primeiros produtos
SELECT * FROM `produtos` LIMIT 12

2- trazer apenas produtos que comecem com a letra a
SELECT * FROM `produtos` WHERE `titulo` LIKE 'a%'

3- trazer apenas produtos que tenham o preço de 410
SELECT * FROM `produtos` WHERE preco = 410

4- trazer apenas produtos com avaliação 4 e 5
SELECT * FROM `produtos` WHERE avaliacao IN(4,5) --VERSÃO MAIS MODERNA--

5- trazer apenas produtos com avaliação 1 e 5
SELECT * FROM `produtos` WHERE avaliacao = 1 OR avaliacao = 5

6- trazer apenas produtos entre id 21 e 32
SELECT * FROM `produtos` WHERE id = 21 OR id = 32

7- trazer apenas os 12 últimos produtos
SELECT * FROM `produtos` ORDER BY id DESC LIMIT 12;

8- trazer apenas os 12 primeiros produtos com avaliação 5
SELECT * FROM `produtos` WHERE avaliacao='5' ORDER BY id ASC LIMIT 12;

9- trazer todo os produtos em ordem de preço do menor para o maior
SELECT * FROM `produtos` ORDER BY preco ASC;

10- trazer todo os produtos em ordem de avaliação do menor para o maior
SELECT * FROM `produtos` ORDER BY avaliacao ASC;

```
```txt
id, 
nome_da_loja, 
telefone, 
email, 
endereco, 
latitude, 
longitude, 
foto
---

objetivo: criar uma para exibir em cards(com nome da unidade, foto, endereço, email, telefone) todas as 6 unidades
 
1 - duplicar a index.html e renomear para unidades.html
2 - duplicar o app.js e renomear para app-unidades.js
3 - no index.js criar a rota /unidades
4 - na rota /unidades fazer o select para retornar as unidades
5 - fazer os ajustes em unides.html, app-unidades.js e index.js necessários para funcionar a o página unidades.html

```