import { Popover } from "@headlessui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface inputType {
  monthlyGross: string;
  otherIncome: string;
  otherExpenses: string;
  otherDeductions: string;
  pensionType: string;
  pensionValue: string;
}
const Home: NextPage = () => {
  let initialValues = {
    monthlyGross: "",
    otherIncome: "",
    otherExpenses: "",
    otherDeductions: "",
    pensionType: "PERCENTAGE",
    pensionValue: "",
  };
  const [data, setData] = useState<inputType>(initialValues);
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  const { data: taxData } = useQuery(["tax", data], async () => {
    const response = await fetch(`/api/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  return (
    <div className="min-h-full">
      <Head>
        <title>Tax Calculator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Popover as="header" className="pb-24 bg-indigo-600">
        {({ open }) => (
          <>
            <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative flex items-center justify-center py-5 lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 flex-shrink-0 pt-2 lg:static">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <h1 className="text-5xl text-white font-island">
                      Tax Calculator
                    </h1>
                  </a>
                </div>

                {/* Right section on desktop */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                  {/* Profile dropdown */}
                </div>
              </div>
              <div className="hidden py-5 border-t border-white lg:block border-opacity-20">
                <div className="grid items-center grid-cols-3 gap-8">
                  <div className="col-span-2"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
      <main className="pb-8 -mt-24">
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="overflow-hidden bg-white rounded-lg shadow">
                  <div className="p-6">
                    <form
                      className="space-y-8 divide-y divide-gray-200"
                      onSubmit={onSubmit}
                    >
                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Earnings
                            </h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                              For accurate results convert annual figures to
                              monthly
                            </p>
                          </div>

                          <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="monthlyGross"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Monthly Gross
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">
                                    $
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  name="monthlyGross"
                                  id="monthlyGross"
                                  className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                  value={data.monthlyGross}
                                  onChange={(e) =>
                                    setData((prev) => ({
                                      ...prev,
                                      monthlyGross: e.target.value,
                                    }))
                                  }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <span
                                    className="text-gray-500 sm:text-sm"
                                    id="price-currency"
                                  >
                                    JMD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="otherIncome"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Other Taxable Income
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">
                                    $
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  name="otherIncome"
                                  id="otherIncome"
                                  className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                  value={data.otherIncome}
                                  onChange={(e) =>
                                    setData((prev) => ({
                                      ...prev,
                                      otherIncome: e.target.value,
                                    }))
                                  }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <span
                                    className="text-gray-500 sm:text-sm"
                                    id="price-currency"
                                  >
                                    JMD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Deductions
                            </h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                              Enter voluntary deductions
                            </p>
                          </div>
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="pensionValue"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Pension
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                                <input
                                  type="number"
                                  name="pensionValue"
                                  id="pensionValue"
                                  className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                                  placeholder="10.00"
                                  value={data.pensionValue}
                                  onChange={(e) =>
                                    setData((prev) => ({
                                      ...prev,
                                      pensionValue: e.target.value,
                                    }))
                                  }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                  <label htmlFor="currency" className="sr-only">
                                    Pension Type
                                  </label>
                                  <select
                                    id="pensionType"
                                    name="pensionType"
                                    className="h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 sm:text-sm"
                                    value={data.pensionType}
                                    onChange={(e) =>
                                      setData((prev) => ({
                                        ...prev,
                                        pensionType: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="PERCENTAGE">percent</option>
                                    <option value="FIXED">dollars</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="other_deductions"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Other deductions
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">
                                    $
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  name="otherDeductions"
                                  id="otherDeductions"
                                  className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                  value={data.otherDeductions}
                                  onChange={(e) =>
                                    setData((prev) => ({
                                      ...prev,
                                      otherDeductions: e.target.value,
                                    }))
                                  }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <span
                                    className="text-gray-500 sm:text-sm"
                                    id="price-currency"
                                  >
                                    JMD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setData(initialValues)}
                          >
                            Reset
                          </button>
                          <a
                            href="#tax-results"
                            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Calculate
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4" id="tax-results">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="overflow-hidden bg-white rounded-lg shadow">
                  <div className="p-6">
                    {/* Order summary */}
                    <section
                      aria-labelledby="summary-heading"
                      className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                    >
                      <h2
                        id="summary-heading"
                        className="text-lg font-medium text-gray-900"
                      >
                        Tax Breakdown
                      </h2>

                      <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <dt className="text-sm text-gray-600">
                            Total Earnings
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            ${taxData?.breakdown?.totalEarnings}
                            {/* {totalEarnings} */}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="flex items-center text-sm text-gray-600">
                            <span>National Insurance Scheme (NIS)</span>
                            <a
                              href="#"
                              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                            ></a>
                          </dt>
                          <dd className="text-sm font-medium text-red-900">
                            (${taxData?.breakdown?.nationalInsuranceScheme})
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="flex items-center text-sm text-gray-600">
                            <span>Pension</span>
                            <a
                              href="#"
                              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                            ></a>
                          </dt>
                          <dd className="text-sm font-medium text-red-900">
                            ($
                            {
                              taxData?.breakdown?.voluntaryDeductions
                                ?.pensionAmount
                            }
                            )
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="flex text-sm text-gray-600">
                            <span>Education Tax</span>
                            <a
                              href="#"
                              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                            ></a>
                          </dt>
                          <dd className="text-sm font-medium text-red-900">
                            (${taxData?.breakdown?.educationTax})
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="flex text-sm text-gray-600">
                            <span>National Housing Trust (NHT)</span>
                            <a
                              href="#"
                              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                            ></a>
                          </dt>
                          <dd className="text-sm font-medium text-red-900">
                            (${taxData?.breakdown?.nationalHousingTrust})
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="flex text-sm text-gray-600">
                            <span>Income Tax (PAYE)</span>
                            <a
                              href="#"
                              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                            ></a>
                          </dt>
                          <dd className="text-sm font-medium text-red-900">
                            (${taxData?.breakdown?.incomeTax})
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="flex text-sm text-gray-600">
                            <span>Other Deductions</span>
                            <a
                              href="#"
                              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                            ></a>
                          </dt>
                          <dd className="text-sm font-medium text-red-900">
                            ($
                            {
                              taxData?.breakdown?.voluntaryDeductions
                                ?.deductions
                            }
                            )
                          </dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="text-base font-medium text-gray-900">
                            Net Pay
                          </dt>
                          <dd className="text-sm font-medium text-red-900"></dd>
                        </div>
                      </dl>

                      <div className="mt-6">
                        <div className="w-full px-4 py-3 text-2xl font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm md:text-3xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                          ${taxData?.breakdown?.netMonthlyIncome}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="py-8 text-sm text-center text-gray-500 border-t border-gray-200 sm:text-left">
            <span className="block sm:inline">
              &copy; 2021 Rainaldo F. Crosbourne
            </span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
