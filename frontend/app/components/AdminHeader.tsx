import Link from 'next/link';

const AdminHeader = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link href="/admin" style={{ margin: '0 1rem' }}>
          Admin Home
        </Link>
        <Link href="/warehouse" style={{ margin: '0 1rem' }}>
          Warehouse Home
        </Link>       
        <Link href="/" style={{ margin: '0 1rem' }}>
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;