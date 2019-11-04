conn = database('minmax','minmax','minmax','Vendor', 'PostgreSQL', 'Server', 'localhost', 'Port', 5432);
query = 'SELECT * FROM haushalt_konto';
Konten = fetch(conn, query);
