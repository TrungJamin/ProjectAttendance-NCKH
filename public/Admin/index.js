const homepage = document.getElementById('homepage');
const allStudents = document.getElementById('all-Students');
const iFrame = document.querySelector('.iFrame');

const addTeacher = document.getElementById('add-Teacher');
const listTeacher = document.getElementById('all-Teachers');
const addFaceStudent = document.querySelector('.add-face-student');
let url = 'home';
const formLogout = document.querySelector('.formLogout'); // form hien thi log out
const btnLogout = document.querySelector('#btnLogout'); // button hien thi form
const agreeLogout = document.querySelector('#agreeLogout'); // dong y dang xuat

const auth = firebase.auth();

function setNameOfTeacher(name) {
  // remove @gmail.com

  let nameTmp = '' + name;
  nameTmp = nameTmp.replace('@gmail.com', '');
  document.querySelector('#nameOfTeacher').innerHTML = nameTmp;
}

const isAccountExist = (email) => {
  let isAdmin = false;
  return db
    .collection('TeacherAdmin')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((teacher) => {
        if (teacher.data().email === email) {
          isAdmin = {
            isAdmin: true,
            id: teacher.id,
          };
          return;
        }
      });
      return isAdmin;
    })
    .catch(function (error) {
      return false;
    });
};
const setClassTeacherAdmin = (newLeader) => {
  const { classLeader, id, email } = newLeader;
  return db
    .collection('TeacherAdmin')
    .doc(id)
    .set({
      email: email,
      class: classLeader,
    })
    .then((res) => {});
};
const makeTeacherAdmin = async (newAccount) => {
  const { classLeader, email, password } = newAccount;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async function (response) {
      await setClassTeacherAdmin({
        email: email,
        classLeader: classLeader,
        id: response.user.uid,
      });
    })
    .then((result) => {})
    .catch(function (error) {
      alert(error.message);
    });
};

btnLogout.addEventListener('click', (event) => {
  Swal.fire({
    title: 'Bạn có chắc muốn đăng xuất?',

    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: ' #3085d6',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Không',
  }).then((result) => {
    if (result.isConfirmed) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.assign('./../index.html');
        })
        .catch((error) => {
          // An error happened.
        });
    }
  });
});

function closeFormLogout() {
  // dong forms
  formLogout.classList.remove('open');
}

agreeLogout.addEventListener('click', (event) => {
  event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.assign('./../index.html');
    })
    .catch((error) => {
      // An error happened.
    });
});
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.assign('./../');
  } else {
    user
      .getIdTokenResult()
      .then((token) => {
        !token.claims.admin ? location.assign('./../teacher/screen') : '';
      })
      .catch((error) => {});
    setNameOfTeacher(user.email);
    homepage.classList.remove('non_active');
  }
});

// doạn này khi vào trang se vao trang all teache dung 1 l

function refresh() {
  if (sessionStorage.getItem('url')) {
    // neu co di theo url cu
    iFrame.src = sessionStorage.getItem('url');
  } else {
    iFrame.src = './mangeTeacher/';
  }
}
refresh();

allStudents.addEventListener('click', (event) => {
  sessionStorage.setItem('url', './mangeStudent/');
  iFrame.src = './mangeStudent/';
});

listTeacher.addEventListener('click', (event) => {
  sessionStorage.setItem('url', './mangeTeacher/');

  iFrame.src = './mangeTeacher/';
});
addFaceStudent.addEventListener('click', function (e) {
  sessionStorage.setItem('url', './addFaceDataBase/');

  iFrame.src = './addFaceDataBase';
});
