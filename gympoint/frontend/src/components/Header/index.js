import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../assets/logo-secondary.png';

import { signOut } from '../../store/modules/auth/actions';

export default function Header(props) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.user);
  const [pageCurrent, setPageCurrent] = useState(
    window.location.pathname.substr(1)
  );
  console.log(props);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handlePageCurrent(page) {
    setPageCurrent(page);
  }

  return (
    <Container>
      <div className="area-center">
        <div className="area-logo">
          <Link
            className={pageCurrent === 'students' ? 'active' : ''}
            to="/students"
            onClick={() => handlePageCurrent('students')}
          >
            <img src={logo} alt="Gympoint" />
          </Link>
        </div>
        <div className="area-nav">
          <nav>
            <ul>
              <li>
                <Link
                  className={pageCurrent === 'students' ? 'active' : ''}
                  to="/students"
                  onClick={() => handlePageCurrent('students')}
                >
                  Alunos
                </Link>
              </li>
              <li>
                <Link
                  className={pageCurrent === 'plans' ? 'active' : ''}
                  to="/plans"
                  onClick={() => handlePageCurrent('plans')}
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  className={pageCurrent === 'enrollments' ? 'active' : ''}
                  to="/enrollments"
                  onClick={() => handlePageCurrent('enrollments')}
                >
                  Matriculas
                </Link>
              </li>
              <li>
                <Link
                  className={pageCurrent === 'helps' ? 'active' : ''}
                  to="/helps"
                  onClick={() => handlePageCurrent('helps')}
                >
                  Pedido de Auxilio
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="area-user">
          <span className="feature">{profile.name}</span>
          <a href="/" onClick={handleSignOut}>
            sair do sistema
          </a>
        </div>
      </div>
    </Container>
  );
}
