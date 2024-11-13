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

// Chama a função para carregar os usuários ao carregar a página
window.onload = fetchUsuarios;


