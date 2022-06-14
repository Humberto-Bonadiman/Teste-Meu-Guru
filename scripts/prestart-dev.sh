#! /bin/bash
PATH=$(npm bin):$PATH
export NODE_ENV=development

function initialize_back_end () {
  printf "\n> ASYNC: Instalando o back-end e inicializando o banco de dados com o ORM em modo de desenvolvimento\n"
  (
    cd ./back-end
    cacheFolderBack="/tmp/teste-meu-guru-back-end-dev-cache"
    rm -rf $cacheFolderBack
    npm_config_loglevel=silent npm install --cache $cacheFolderBack
    npx prisma generate
    npx prisma migrate dev
    ts-node prisma/seed.ts
  )
}

function initialize_front_end() {
  printf "\n> ASYNC: Instalando o front-end\n"
  (
    cd ./front-end
    cacheFolderFront="/tmp/teste-meu-front-end-dev-cache"
    rm -rf $cacheFolderFront
    npm_config_loglevel=silent npm install --cache $cacheFolderFront
  )
}

initialize_back_end & initialize_front_end

printf "\n> Script terminado\n\n"
