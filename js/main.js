const url = "http://localhost:3000/api"

function getCursos(){
    axios.get(`${url}/curso`).then(
        (response) => {
            const data = response.data.result

            let html = "<option disabled selected>Selecione uma opção</option>"

            for(let curso of data){
                html += `<option value="${curso.id}">${curso.nome}</option>`
            }
            document.getElementById('select-course').innerHTML = html
        }
    ).catch(err => console.error(err))
}

function getAlunos(){
    axios.get(`${url}/aluno`).then(
        (response) => {
            const data = response.data.result

            let html = ""

            for(let aluno of data){
                html += `<tr>
                <th scope="row">${aluno.id}</th>
                <td>${aluno.nome}</td>
                <td>${aluno.telefone}</td>
                <td>${aluno.email}</td>
                <td><button class="btn btn-success" onclick="redirect(${aluno.id})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="deleteAluno(${aluno.id})">Excluir</button></td>
                </tr>`
            }
            document.getElementById('table-body').innerHTML = html
        }
    ).catch(err => console.error(err))
}

function deleteAluno(codigo){
    axios.delete(`${url}/aluno/${codigo}`).then(
        (response) => {
            alert(response.data.result)
            getAlunos()
        }
    ).catch(err => console.error(err))
}

function saveAluno(){
    let image = document.getElementById('uploadImage').files[0]
    let nome = document.getElementById('inputName').value
    let email = document.getElementById('inputEmail').value
    let telefone = document.getElementById('inputPhone').value
    let data_nascimento = document.getElementById('inputDate').value

    let select = document.getElementById('select-course')
    let option = select.options[select.selectedIndex].value

    const data = {
        image: image,
        nome: nome,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento,
        curso: option
    }

    axios.post(`${url}/aluno`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        alert(response.data.result)
        window.location.href = "http://localhost/front-labschool/matricula-alunos.html"
    }    
    ).catch(err => console.error(err))
}

function redirect(id){
    window.location.href = `http://localhost/front-labschool/atualizacao-aluno.html?id=${id}`
}

function loadFields(){

    //Capturar o parametro 'id' na URL
    //get(): obter o valor de um parametro especifico
    let params = new URLSearchParams(window.location.search)
    let idParams = params.get('id')

    axios.get(`${url}/aluno/${idParams}`).then(
        (response) => {
            const data = response.data.result

            // document.getElementById('previewImage')
            document.getElementById('inputName').value = data.nome
            document.getElementById('inputEmail').value = data.email
            document.getElementById('inputPhone').value = data.telefone

            const [date, time] = data.data_nascimento.split('T') 

            document.getElementById('inputDate').value = date
        }
    ).catch(err => console.error(err))
}

function updateAluno(){
    let image = document.getElementById('uploadImage').files[0]
    let nome = document.getElementById('inputName').value
    let email = document.getElementById('inputEmail').value
    let telefone = document.getElementById('inputPhone').value
    let data_nascimento = document.getElementById('inputDate').value

    let params = new URLSearchParams(window.location.search)
    let idParams = params.get('id')

    const data = {
        image: image,
        nome: nome,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento
    }

    axios.put(`${url}/aluno/${idParams}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(
        (response) => {
            alert(response.data.result)
            window.location.href = "http://localhost/front-labschool/index.html"
        }
    ).catch(err => console.error(err))
}