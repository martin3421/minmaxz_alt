clc;clear;
conn = database('minmax','minmax','minmax','Vendor', 'PostgreSQL', 'Server', 'localhost', 'Port', 5432);
query = 'SELECT * FROM haushalt_konto';
Konten = fetch(conn, query);
for k = 1:height(Konten)
    ebene = 0;
    if ~isnan(Konten.elternkonto_id(k))
        Konto = Konten(k,:);
        has_parent = true;
        ebene = 1;
        Konto_parent = Konten(Konten.id == Konto.elternkonto_id,:);
        while has_parent
            if ~isnan(Konto_parent.elternkonto_id(1))
                Konto_parent = Konten(Konten.id == Konto_parent.elternkonto_id(1),:);
                ebene = ebene + 1;
            else
                has_parent = false;
            end
        end
    end
    Konten.ebene(k) = ebene;
    whereclause = sprintf('WHERE id=%d',Konten.id(k));
    update(conn, 'haushalt_konto', {'ebene'}, {ebene}, whereclause)
end
