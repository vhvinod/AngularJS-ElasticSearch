host=localhost
port=9200
index=users
url=${host}:${port}/${index}

function initData {
    curl -s -XPOST "${url}/users/_bulk?pretty" --data-binary "@users.json"
}

function dropIndex {
    curl -s -XDELETE ${url} >> elasticsearch.log
}

dropIndex
initData