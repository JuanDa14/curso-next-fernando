import Link from 'next/link';
import { MainLayout } from '../../components';

const contact = () => {
	return (
		<MainLayout>
			<h1>Contact Page</h1>
			<h1>
				Ir a <Link href='/'>Home</Link>
			</h1>

			<p>
				Get started by editing <code>pages/index.js</code>
			</p>
		</MainLayout>
	);
};

export default contact;
