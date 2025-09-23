import * as SQLite from 'expo-sqlite';

async function Conexao() {
    try {
        const db = await SQLite.openDatabaseAsync('PAM2');
        console.log('Banco Criado');
        return db;
    } catch (error) {
        console.log('erro ao criar o banco ' + error);
        // Try to delete and recreate the database
        try {
            await SQLite.deleteDatabaseAsync('PAM2');
            const db = await SQLite.openDatabaseAsync('PAM2');
            console.log('Banco Recriado');
            return db;
        } catch (recreateError) {
            console.log('Erro ao recriar o banco: ' + recreateError);
            throw new Error('Falha ao conectar ao banco de dados: ' + error);
        }
    }
}

// ------------------------------------------------

async function dropTable(db: SQLite.SQLiteDatabase, tableName: string) {
    try { 
        await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
        console.log(`Tabela ${tableName} excluída com sucesso.`);
    } catch (error) {
        console.log(`Erro ao excluir a tabela ${tableName}: ` + error);
        throw error; // Re-throw to propagate the error
    }
}

// -------------------------------------------
async function createTable(db: SQLite.SQLiteDatabase) {
    try {
        await db.execAsync(
            `PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS USUARIO ( 
                    ID_US INTEGER PRIMARY KEY AUTOINCREMENT, 
                    NOME_US VARCHAR(100),
                    EMAIL_US VARCHAR(100)
                );`
        );
        console.log('Tabela Criada !!!');
    } catch (erro) {
        console.log('Erro Tabela !!!' + erro);
        throw erro; // Re-throw to propagate the error
    }
}

// -------------------------------------------
// inserir dados na tabela
async function inserirUsuario(db: SQLite.SQLiteDatabase, name: string, email: string) {
    try {
        await db.runAsync(
            "INSERT INTO USUARIO (NOME_US, EMAIL_US) VALUES (?, ?)",
            [name, email]
        );
        console.log("Inserido com sucesso");
    } catch (error) {
        console.log('Erro ao inserir usuario ' + error);
        throw error; // Re-throw to propagate the error
    }
}

// -------------------------------------------
// exibir todos os usuarios
async function selectUsuario(db: SQLite.SQLiteDatabase) {
    try {
        const result = await db.getAllAsync('SELECT * FROM USUARIO');
        console.log('Usuarios encontrados');
        return result;
    } catch (error) {
        console.log('Erros ao buscar usuarios: ' + error);
        throw error; // Re-throw to propagate the error
    }
}

// -------------------------------------------
// Filtrar usuario ID
async function selectUsuarioId(db: SQLite.SQLiteDatabase, id: number) {
    try {
        const result = await db.getFirstAsync('SELECT * FROM USUARIO WHERE ID_US = ?', [id]);
        console.log('Filtro de Usuario por ID ' + id);
        return result;
    } catch (error) {
        console.log('Erro ao buscar usuario ' + error);
        throw error; // Re-throw to propagate the error
    }
}

// ------------------------------------
async function deleteUsuario(db: SQLite.SQLiteDatabase, id: number) {
    try {
        if (!db) {
            throw new Error('Database connection is null');
        }
        await db.runAsync('DELETE FROM USUARIO WHERE ID_US = ?', [id]);
        console.log(`Usuário com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.log(`Erro ao excluir usuário com ID ${id}: ` + error);
        throw error; // Re-throw to propagate the error
    }
}

// --------------------------------------
async function updateUsuario(db: SQLite.SQLiteDatabase, id: number, name: string, email: string) {
    try {
        if (!db) {
            throw new Error('Database connection is null');
        }
        await db.runAsync('UPDATE USUARIO SET NOME_US = ?, EMAIL_US = ? WHERE ID_US = ?', [name, email, id]);
        console.log(`Usuário com ID ${id} atualizado com sucesso.`);
    } catch (error) {
        console.log(`Erro ao atualizar usuário com ID ${id}: ` + error);
        throw error; // Re-throw to propagate the error
    }
}

// -------------------------------------------
export { Conexao, createTable, inserirUsuario, selectUsuario, selectUsuarioId, dropTable, deleteUsuario, updateUsuario };
