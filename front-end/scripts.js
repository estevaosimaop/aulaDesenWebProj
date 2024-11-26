// Função que será acionada quando o botão for clicado
document.getElementById("btnClique").addEventListener("click", function() {
    let mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = "<div class='alert alert-success'>Você clicou no botão! 🎉</div>";
});

function validarFormCadast(){
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let status = false;
    const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
              if (!form.checkValidity()) {    
                status = true;            
              }        
              form.classList.add('was-validated')
              
          })
          if (!status){
            salvarValores();
          }
}


function salvarValores(){
    // alert("Salvando...")
    let nome = document.getElementById("validationCustom01").value;
    let email = document.getElementById("validationCustom02").value;
    let senha = document.getElementById("validationCustomUsername").value;
    fetchCreateUser(nome, email, senha);
    alert("Salvo!")
    
}

async function getData() {
    const url = "https://example.org/products.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Função para consumir a API de usuários
const fetchUsuarios = async () => {
  try {
      const response = await fetch('http://localhost:3000/api/usuarios');
      const data = await response.json();
      
      const tableBody = document.querySelector('#usuarios-table tbody');
      tableBody.innerHTML = ''; // Limpa a tabela antes de preencher

      data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.nome}</td>
              <td>${user.email}</td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
  }
};

// // Chama a função para carregar os usuários ao carregar a página
// window.onload = fetchUsuarios;

function carregaUsuarioBack(){
  // Obtém o token armazenado no cookie ou localStorage
  const token = localStorage.getItem('token'); // Exemplo: obtenha o token do armazenamento seguro

  // Configura o cabeçalho Authorization para incluir o token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // Exemplo de requisição GET protegida
  axios.get('http://localhost:3000/api/login')
      .then(response => {
          console.log(response.data);
          const token = response.data;
          localStorage.setItem("token", token);
          
      })
      .catch(error => {
          console.error('Erro na requisição:', error);
      });
  }

  //carregaUsuarioBack();

  async function rotaProibida(){
    const novoPost = {
      title: 'Meu novo post',
      body: 'Conteúdo do post',
      userId: 1
    };
    
    const access_token = localStorage.getItem("token");

    await axios.get('http://localhost:3000/rotaprotegida', {
      headers: { 'Authorization': `Bearer ${access_token}`}
      
    })
      .then(response => {
        console.log('Post criado com token de autenticação:', response.data);
      })
      .catch(error => {
        console.error('Erro ao criar post com autenticação:', error.response.data);
      });
  }
  
  const fetchDadosProtegidos = async () => {
    try {
        const token = obterToken();

        // Configura o cabeçalho Authorization com o token
        const resposta = await axios.post('http://localhost:3000/api/protected', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Dados recebidos:', resposta.data);
    } catch (erro) {
        console.error('Erro ao fazer a requisição:', erro);
    }
};

  rotaProibida();



  const fetchCreateUser = async (nome, email, senha) => {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios', 
          {
            method:"POST",
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email, senha})
          }
        );
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
  };

