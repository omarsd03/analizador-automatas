const colors = require('colors');
const fs = require("fs");

let tblSimbolos = [
    [ //Identificadores
        "Boolean",
        "null",
        "undefined",
        "Number",
        "String",
        "Symbol",
        "Object"
    ],

    [ //Palabras Reservadas
        "alert",
        "break",
        "case",
        "class",
        "catch",
        "console",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "export",
        "extends",
        "finally",
        "for",
        "function",
        "if",
        "import",
        "in",
        "instanceof",
        "let",
        "log",
        "new",
        "return",
        "super",
        "switch",
        "this",
        "throw",
        "try",
        "typeof",
        "var",
        "void",
        "while",
        "with",
        "yield"
    ],

    [ // Delimitadores
        ";",
        "[]",
        "[",
        "]",
        "{}",
        "{",
        "}",
        "()",
        "(",
        ")",
        "//",
        "/*",
        "*/",
        "=>",
        "."
    ],

    [ // Operadores
        "+",
        "-",
        "*",
        "/",
        "=",
        "&",
        "^=",
        "|",
        "==",
        "!=",
        "===",
        "!==",
        ">",
        ">=",
        "<",
        "<="
    ],

    [ // Espacios en blanco
        ""
    ],

    [ // Nuevos Tokens

    ]
];

fs.readFile("archivo.txt", "utf-8", (error, datos) => {
    if (error) {
        throw error;
    } 
    else {
        var arreglo = new String(datos);
        var split = arreglo.split("\n").join(""); //Elimina los \n que hay en el archivo

        var reemplazo = /\r/g; // Expresion regular para encontrar los \r
        let nuevoValor = "";
        let nuevoSplit = split.replace(reemplazo, nuevoValor);

        var reemplazo2 = /();/g; // Expresion Regular para encontrar los ; () . etc
        let nuevoValor2 = " ; ";
        let nuevoSplit2 = nuevoSplit.replace(reemplazo2, nuevoValor2);
        let arregloSeparado = nuevoSplit2.split(" "); // Este divide los caracteres en conjunto

        //console.log(arregloSeparado); // Este muestra los caracteres divididos en el archivo de texto

        let contar = 0;
        let identificadores = 0;
        let palabrasReservadas = 0;
        let delimitadores = 0;
        let operadores = 0;
        let space = 0;

        for (let i = 0; i < tblSimbolos.length; i++) {

            for (let j = 0; j < tblSimbolos[i].length; j++) {

                for (let x = 0; x < arregloSeparado.length; x++) {

                    if (arregloSeparado[x] === tblSimbolos[i][j]) {
                        //console.log(arregloSeparado[x].green);
                        contar += 1;
                        //console.log("====================");

                        if (arregloSeparado[x] === tblSimbolos[0][j]) {
                            identificadores += 1;
                        } else if (arregloSeparado[x] === tblSimbolos[1][j]) {
                            palabrasReservadas += 1;
                        } else if (arregloSeparado[x] === tblSimbolos[2][j]) {
                            delimitadores += 1;
                        } else if (arregloSeparado[x] === tblSimbolos[3][j]) {
                            operadores += 1;
                        } else if (arregloSeparado[x] === tblSimbolos[4][j]) {
                            space += 1;
                        }
                    }
                }
            }

        }
        console.log(colors.red("Simbolos: %s"), contar - space);
        console.log(colors.cyan("Identificadores:"), identificadores);
        console.log(colors.cyan("Palabras reservadas:"), palabrasReservadas);
        console.log(colors.cyan("Delimitadores:"), delimitadores);
        console.log(colors.cyan("Operadores:"), operadores);
        console.log(colors.bgBlack("Espacios en blanco:"), space);
        console.log(colors.gray("Tokens: %s"), arregloSeparado.length - space);
        console.log("==========================");
    }

});

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('archivo.txt')
});

lineReader.on('line', function (line) {
    //let expresionRegular = /^([A-Z a-z]+\.)/g;
    let expresionRegular = /^([let])+[A-Z a-z]/g;
    //console.log("Linea:", line + expresionRegular.test(line));

    let evaluarExpresion = () => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                expresion = expresionRegular.test(line);
                if (expresion === true) {
                    resolve(`Linea: ${line} => ${colors.green(expresion)}`);
                }
                else if (expresion !== true) {
                    resolve(`Linea: ${line} => ${colors.red(expresion)}`);
                }
                else {
                    reject('Error..');
                }
            }, 3000);

        });
    };

    evaluarExpresion().then(expresion => {
        return expresion;
    })
    .then(resp => {
        console.log(resp);
    })
    .catch(err => {
        console.log(err);
    });
    
});