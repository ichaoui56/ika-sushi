import AdminProductsPage from "../../../components/admin/pages/AdminProductsPage";

interface ProductsPageProps {
	searchParams: Promise<{
		page?: string | string[];
		view?: string | string[];
		q?: string | string[];
	}>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
	return <AdminProductsPage searchParams={searchParams} />;
}