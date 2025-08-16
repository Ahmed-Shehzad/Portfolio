import { ScrollAnimationWrapper } from "@/wrappers";
import { memo } from "react";

export const CoreStrengths = memo(() => {
  return (
    <div className="mt-20 flex flex-col gap-8">
      <ScrollAnimationWrapper animation="fadeInUp" delay={250}>
        <div className="mb-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold md:text-3xl">Core Strengths</h3>
          <p className="mx-auto max-w-2xl text-white/70">
            My professional focus areas where I deliver exceptional results
          </p>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-r from-purple-300 to-pink-300 p-[1px]">
            <div className="rounded-3xl bg-gray-900 p-8 md:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Backend Architecture & APIs */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🏗️</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Backend Architecture & APIs</h4>
                    <p className="text-sm text-white/80">
                      Core expertise in scalable backend systems with .NET 8, C#, PostgreSQL, MS
                      SQL, Redis, and RESTful/GraphQL APIs. Experienced with microservices
                      architecture and clean code principles.
                    </p>
                  </div>
                </div>

                {/* Frontend Integration Skills */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🌐</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Frontend Integration Skills</h4>
                    <p className="text-sm text-white/80">
                      Proficient with React, TypeScript, Tailwind CSS for seamless full-stack
                      integration
                    </p>
                  </div>
                </div>

                {/* DevOps & Cloud Integration */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🚀</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">DevOps & Cloud Integration</h4>
                    <p className="text-sm text-white/80">
                      Implementing CI/CD pipelines with Docker, Kubernetes, Microsoft Azure Cloud,
                      Azure DevOps, and expanding AWS expertise
                    </p>
                  </div>
                </div>

                {/* AI-Assisted Development */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🤖</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">AI-Assisted Development</h4>
                    <p className="text-sm text-white/80">
                      Leveraging AI tools strategically as pair programming partners with
                      intentional, knowledge-driven approach
                    </p>
                  </div>
                </div>

                {/* Database & Architecture */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🗄️</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Database & Architecture</h4>
                    <p className="text-sm text-white/80">
                      PostgreSQL, MS SQL Server, Redis, domain-driven design, and microservices
                      architecture
                    </p>
                  </div>
                </div>

                {/* Messaging & Integration */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🔄</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Messaging & Integration</h4>
                    <p className="text-sm text-white/80">
                      Understanding of Message Broker for reliable message-driven architectures
                      (e.g., RabbitMQ, Apache Kafka, Amazon SQS)
                    </p>
                  </div>
                </div>

                {/* Quality Assurance */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🧪</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Quality Assurance</h4>
                    <p className="text-sm text-white/80">
                      Integration and Unit testing, Git version control for reliable code delivery
                    </p>
                  </div>
                </div>

                {/* Communication */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">💬</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Communication</h4>
                    <p className="text-sm text-white/80">
                      Fluent in verbal and written English for seamless collaboration. I communicate
                      confidently and appreciatively with customers, stakeholders, and team members.
                    </p>
                  </div>
                </div>

                {/* Continuous Learning */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🚀</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Continuous Learning</h4>
                    <p className="text-sm text-white/80">
                      High willingness to learn always keeps me technologically up to date with
                      emerging trends and best practices
                    </p>
                  </div>
                </div>

                {/* Team Dynamics */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">🤝</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Team Dynamics</h4>
                    <p className="text-sm text-white/80">
                      Team-oriented mindset with systematic problem-solving approach
                    </p>
                  </div>
                </div>

                {/* Clean Architecture Patterns */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">📐</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Clean Architecture Patterns</h4>
                    <p className="text-sm text-white/80">
                      Applying Domain-Driven Design (DDD), CQRS, and Vertical Slice Architecture for
                      maintainable codebases
                    </p>
                  </div>
                </div>

                {/* Performance Optimization */}
                <div className="flex items-start gap-3 rounded-2xl bg-gray-800 p-6 shadow-md">
                  <span className="mt-1 text-2xl">⚡</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Performance Optimization</h4>
                    <p className="text-sm text-white/80">
                      Optimizing performance — from reducing page load times by 50% to scaling
                      services for high traffic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
});

CoreStrengths.displayName = "CoreStrengths";
