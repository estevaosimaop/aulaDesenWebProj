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
    alert("Salvando...")
    
    
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
  axios.get('http://localhost:3000/api/usuarios')
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error('Erro na requisição:', error);
      });
  }

  carregaUsuarioBack();

  function rotaProibida(){
    const novoPost = {
      title: 'Meu novo post',
      body: 'Conteúdo do post',
      userId: 1
    };

    axios.get('http://localhost:3000/rota-protegida', novoPost, {
      headers: { 'Authorization': 'Bearer meu_token_jwt' }
    })
      .then(response => {
        console.log('Post criado com token de autenticação:', response.data);
      })
      .catch(error => {
        console.error('Erro ao criar post com autenticação:', error);
      });
  }

  rotaProibida()