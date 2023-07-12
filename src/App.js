import './App.scss';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { InfoContent } from './components/InfoContent/InfoContent';
import { Users } from './components/Users/Users';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
import { Loader } from './components/Loader/Loader';
function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [firstLoad, setFirstLoad] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
      );
      const { data } = response;
      if (firstLoad) {
        setUsers((prevUsers) => [...prevUsers, ...data.users.reverse()]);
      } else {
        setUsers((prevUsers) => [...data.users.reverse()]);
      }

      setTotalPages(data.total_pages);
    } catch (error) {
      console.log('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [page, firstLoad]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowMore = () => {
    setFirstLoad(true);
    setPage((prevPage) => prevPage + 1);
  };
   const updateUsers = () => {
    setFirstLoad(false);
    setPage(1);
  };
  return (
    <div className="App">
      <div>
        <Header/>
        <InfoContent />
      </div>
      {loading ? (
          <Loader /> // Отображение Loader во время загрузки данных
        ) : (
          <>
            <Users
              users={users}
              page={page}
              totalPages={totalPages}
              firstLoad={firstLoad}
              handleShowMore={handleShowMore}
            />
          </>
        )}
      {/* <Users users={users} page={page} totalPages={totalPages} firstLoad={firstLoad} handleShowMore={handleShowMore} /> */}
      <RegistrationForm updateUsers={updateUsers} />
    </div>
  );
}
export default App;