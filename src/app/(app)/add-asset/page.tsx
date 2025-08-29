import AddAssetForm from "@/components/AddAssetForm";

export default function AddAssetPage() {
  return (
    <div className="bg-gray-50 flex-grow">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Asset</h1>
        <p className="text-center text-gray-600 mb-8">Contribute to the map by adding new infrastructure data.</p>
        <AddAssetForm />
      </div>
    </div>
  );
}