import { GraduationCap, BookOpen, Users, ArrowRight} from 'lucide-react'
import Link from 'next/link'

export default function PublicLandingPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-200 to-background font-sans">
            {/* Hero Section */}
            <section className="px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Transform Your Future with<br />
                        <Link href="/overview">
                            <span className="text-blue-700 sm:text-7xl font-Funnel">platform</span>
                        </Link>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Unlock your potential with our expert-led courses. Learn at your own pace
                        and join a community of lifelong learners.
                    </p>
                    <div className="mt-10">
                        <Link href="/login">
                                <button className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:outline outline-offset-2 ring-offset-transparent outline-blue-700 transition-colors flex items-center gap-2 mx-auto" aria-label="Start Study">
                                Start Study
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="p-6 rounded-xl bg-white shadow-sm" role="region" aria-labelledby="feature-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <GraduationCap className="w-6 h-6 text-blue-600" aria-hidden="true" />
                            </div>
                            <h3 id="feature-1" className="text-xl font-semibold text-gray-900 mb-2">
                                Expert-Led Courses
                            </h3>
                            <p className="text-gray-600">
                                Learn from industry professionals and gain practical skills that matter.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-white shadow-sm" role="region" aria-labelledby="feature-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-blue-600" aria-hidden="true" />
                            </div>
                            <h3 id="feature-2" className="text-xl font-semibold text-gray-900 mb-2">
                                Flexible Learning
                            </h3>
                            <p className="text-gray-600">
                                Study at your own pace with lifetime access to course materials.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-white shadow-sm" role="region" aria-labelledby="feature-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-blue-600" aria-hidden="true" />
                            </div>
                            <h3 id="feature-3" className="text-xl font-semibold text-gray-900 mb-2">
                                Community Support
                            </h3>
                            <p className="text-gray-600">
                                Join a vibrant community of learners and share your journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}