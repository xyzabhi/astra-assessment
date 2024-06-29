"use client";

import { Button } from "@/components/ui/button";
import CustumTable from "@/components/ui/customTable";
import { Input } from "@/components/ui/input";
import { keysEntityMap } from "@/lib/constants";
import { characterDataType } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function EntityPage({}) {
  const pathname: string = usePathname();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currPageNumber, setCurrPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [currPage, setCurrPage] = useState(
    `https://www.swapi.tech/api${pathname}?page=1&limit=10`
  );

  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const getUrlsOfEntityItems = (data: any) => {
    return data.map((item: { url: any }) => item.url);
  };

  const filterDataAsPerAsType = (
    data: any[],
    keys: { label: string; key: string }[]
  ) => {
    const filteredData = data.map((item: any) => {
      const tableRow: any = {};
      keys.forEach((key: { label: string; key: string }) => {
        console.log(item.result.properties[key.key]); // Logging the label for clarity

        // Correctly access item[key.key] to get the value based on the provided key
        tableRow[key.label] = item.result.properties[key.key];
      });
      return tableRow;
    });
    return filteredData;
  };

  useEffect(() => {
    const fetchDataAndFetchAllData = async () => {
      try {
        // Fetch initial data
        setLoading(true);
        const res = await fetch(currPage);
        const result = await res.json();
        const urls = getUrlsOfEntityItems(result.results); // Assuming getUrlsOfEntityItems is defined elsewhere
        setNextPage(result.next);
        setPrevPage(result.previous);
        setTotalPages(result.total_pages);
        // Fetch additional data from extracted urls
        const fetchAllData = async (urls: any[]) => {
          try {
            const fetchPromises = urls.map((url) =>
              fetch(url).then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to fetch data from ${url}: ${response.statusText}`
                  );
                }
                return response.json();
              })
            );

            const data = await Promise.all(fetchPromises);
            // console.log("All data fetched:", data);

            const filteredData = filterDataAsPerAsType(
              data,
              keysEntityMap[pathname.substring(1).toLocaleLowerCase()]
            );
            console.log(filteredData, "filtered deta");
            setData(filteredData);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };

        // Call fetchAllData with the extracted urls
        await fetchAllData(urls);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchDataAndFetchAllData(); // Call the combined function to initiate data fetching
  }, [pathname, currPage]);

  return (
    <div>
      <Input
        type="text"
        className="mb-2"
        placeholder="Search ...."
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <CustumTable data={data} isLoading={loading} />
      <div className="flex items-center justify-between mt-5">
        <Button
          disabled={!prevPage}
          onClick={() => {
            setCurrPage(prevPage ?? "");
            setCurrPageNumber(currPageNumber - 1);
          }}
        >
          Prev
        </Button>
        {totalPages && <p>{`${currPageNumber}/${totalPages}`}</p>}
        <Button
          disabled={!nextPage}
          onClick={() => {
            setCurrPage(nextPage ?? "");
            setCurrPageNumber(currPageNumber + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default EntityPage;
