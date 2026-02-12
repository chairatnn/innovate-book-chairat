export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 gap-y-3 w-1/2">
      <h2 className="text-3xl font-bold text-center">N. Chairat</h2>
      <img
        src="/public/chairat-photo.png"
        alt="admin image"
        className="w-64 rounded-2xl"
      />
      <p className="text-center text-base">
        <span className="font-bold">Fullstack Developer:</span>
        <br /><br />"Hello! I am the System Administrator for this platform. My goal is to ensure you have the best experience possible while using our services. Whether you are looking to get started or want to share your thoughts, I am here to assist: Sign Up / Feedback / Suggestions <br/><strong>Contact: chairatnn@gmail.com</strong> 
      </p>
       <footer class="bg-dark text-center py-4 mt-5">
        <p class="mb-0">&copy; 2026 Book Management. All Rights Reserved.</p>
    </footer>
    </div>
  );
}
