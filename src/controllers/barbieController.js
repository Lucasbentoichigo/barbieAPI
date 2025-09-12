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

    const barbieParaRemover = barbie.find(b => b.id === id);

    if (!barbieParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Essa barbie não existe, ${id}`
        })
    }
    const barbiesFiltradas = barbies.filter(barbie => barbie.id != id);
    
    barbie.splice(0, barbies.length, ...barbiesFiltradas)
    res.status(200).json({
        sucess: true,
        message: "A Barbie foi removida com sucesso",
        barbieRemovida : barbieParaRemover
    })
}
export { getAllBarbies, getBarbiesById, createBarbie, deleteBarbie };