import dados from "./../models/dados.js";
const { barbies } = dados;

const getAllBarbies = (req,res) => {
    const resultado = barbies;

    res.status(200).json({
        total: barbies.length,
        barbies: resultado
    })
}

const getBarbiesById = (req,res) => {
    let id = parseInt(req.params.id);

    const barbie = barbies.find(b => b.id === id);

    res.status(200).json({
        sucess: true,
        barbie: barbie
    })
}

const createBarbie = (req,res) => {
    const { nome, profissao, anoLancamento } = req.body

if (!nome || !profissao) {
   return res.status(400).json({
    sucess: false,
    message: "Nome e profissão são obrigatórios para uma Barbie"
   });
}

const novaBarbie = {
    id: barbies.length + 1,
    nome: nome,
    profissao: profissao,
    anoLancamento: anoLancamento
}

barbies.push(novaBarbie);

res.status(201).json({
    sucess: true,
    message: "Nova Barbie adicionada na coleção com sucesso!",
    barbie: novaBarbie
})
}

const deleteBarbie = (req,res) => {
    let id = parseInt(req.params.id);

    const barbieParaRemover = barbies.find(b => b.id === id);

    if (!barbieParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Essa barbie não existe, ${id}`
        })
    }
    const barbiesFiltradas = barbies.filter(barbie => barbie.id != id);
    
    barbies.splice(0, barbies.length, ...barbiesFiltradas)
    res.status(200).json({
        sucess: true,
        message: "A Barbie foi removida com sucesso",
        barbieRemovida : barbieParaRemover
    })
}

const updateBarbie = (req,res) => {
        //Toda a lógica para atualizar uma barbie especifica.
        const id = parseInt(req.params.id);
        const { nome, profissao, anoLancamento} = req.body

        const idParaEditar = id;

        //Verificar se o Id é válid0
        if (isNaN(idParaEditar)) {
            return res.status(400).json({
                sucess: false,
                message: "O id deve ser um número válido"
            })
        }

        //Verificar se a barbie/id existe
        const barbeExiste = barbies.find(barbie => barbie.id === idParaEditar);

        if (!barbeExiste) {
            return res.status(404).json({
                sucess: false,
                message: `Barbie com Id: ${id} não existe.`
            })
        }

        //Após passar todos os cenários, eu atualizo a barbie

        //Laço é o map

        const barbiesAtulizados = barbies.map(barbie => barbie.id === idParaEditar ? {
            ...barbie,
            ...(nome && { nome }),
            ...(profissao && { profissao }),
            ...(anoLancamento && {anoLancamento: parseInt(anoLancamento)})
 }: barbie)
 //Atualizando o array com o splice
 barbies.splice(0, barbies.length, ...
    barbiesAtulizados)

    const barbieNova = barbies.find(barbie => barbie.id === idParaEditar);

    res.status(200).json({
        sucess: true,
        message: `Dados da Barbie ID ${idParaEditar} atualizados com sucesso!`,
        barbie: barbieNova
    })
}

export { getAllBarbies, getBarbiesById, createBarbie, deleteBarbie, updateBarbie };