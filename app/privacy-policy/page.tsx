export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-8 text-white">隐私政策</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6">
          森诺智联机器人技术有限公司（以下简称“我们”）尊重并保护您的隐私。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息。使用我们的服务即表示您同意我们按照本政策收集和使用您的信息。
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-white">1. 信息收集</h2>
        <p className="text-gray-300 mb-4">
          我们可能会收集您在使用我们服务时主动提供的个人信息，包括但不限于姓名、联系方式、电子邮箱、公司名称、咨询内容等。此外，我们可能会自动收集一些技术信息，如您的IP地址、浏览器类型、访问时间等，用于改善服务质量。
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-white">2. 信息使用</h2>
        <p className="text-gray-300 mb-4">
          我们收集的个人信息将用于以下目的：
        </p>
        <ul className="text-gray-300 mb-4 list-disc pl-5 space-y-2">
          <li>回应您的咨询和请求</li>
          <li>提供您所请求的产品或服务</li>
          <li>改善我们的产品、服务和网站体验</li>
          <li>向您发送相关的产品信息和活动通知（您可以随时取消订阅）</li>
        </ul>
        
        <h2 className="text-xl font-semibold mb-4 text-white">3. 信息保护</h2>
        <p className="text-gray-300 mb-4">
          我们将采取适当的技术和组织措施保护您的个人信息，防止其被未授权访问、使用、泄露或篡改。我们仅允许授权人员访问您的信息，并且这些人员需遵守严格的保密义务。
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-white">4. 信息共享</h2>
        <p className="text-gray-300 mb-4">
          我们不会向第三方出售、出租或共享您的个人信息，除非获得您的明确同意，或法律要求我们这样做，或为了保护我们的合法权益。
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-white">5. 政策更新</h2>
        <p className="text-gray-300">
          本隐私政策可能会根据法律法规的变化或业务发展情况进行更新。更新后的政策将在网站上公布，并以最新的发布日期为准。我们建议您定期查看本政策。
        </p>
      </div>
    </div>
  );
}