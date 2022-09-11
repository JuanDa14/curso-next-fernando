import Link from 'next/link';
import { MainLayout } from '../../components/layouts/MainLayout';

export default function index() {
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
}
