import { useCallback, useEffect, useRef, useState } from 'react'

import { useIsMounted } from '~/hooks/use-is-mounted'

import './styles.css'

export default function JobBoard() {
  let { loadMore, hasNext, loading, jobs } = useFetchJobDetails()

  return (
    <div className="JobBoard__container">
      <h1 className="JobBoard__title">Hacker News Jobs Board</h1>

      {Boolean(jobs.length) && (
        <div className="JobBoard__JobList">
          {jobs.map((job) => (
            <div key={job.id} className="JobBoard__Jobcard">
              <h2>{job.url ? <a href={job.url}>{job.title}</a> : job.title}</h2>

              <p>
                By {job.by} &middot;{' '}
                {new Date(job.time * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div>
        {hasNext() && (
          <button className="JobBoard__LoadMore" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>

      {loading && <div className="JobBoard__loading">loading...</div>}
    </div>
  )
}

let JOB_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json'

let JOB_DESCRIPTION_URL = function (
  _strings: TemplateStringsArray,
  ...values: string[]
) {
  return `https://hacker-news.firebaseio.com/v0/item/${values[0]}.json`
}

let PAGE_SIZE = 6

type Job = {
  id: number
  title: string
  by: string
  url: string
  time: number
}

function useFetchJobDetails() {
  let [loading, setLoading] = useState(true)
  let [jobs, setJobs] = useState<Job[]>([])

  let jobIdsRef = useRef([])
  let pageRef = useRef(1)

  let isMounted = useIsMounted()

  function getRange() {
    let start = (pageRef.current - 1) * PAGE_SIZE
    let end = pageRef.current * PAGE_SIZE
    return [start, end]
  }

  let fetchJobIds = useCallback(async () => {
    let [start, end] = getRange()

    if (!jobIdsRef.current.length) {
      jobIdsRef.current = await (await fetch(JOB_STORIES_URL)).json()
    }

    return jobIdsRef.current.slice(start, end)
  }, [])

  let fetchJobDetail = useCallback(
    async (id: string) =>
      (await (await fetch(JOB_DESCRIPTION_URL`${id}`)).json()) as Job,
    []
  )

  let fetchJobsDetails = useCallback(async () => {
    setLoading(true)

    try {
      let jobIds = await fetchJobIds()
      let jobs = await Promise.all(jobIds.map(async (id) => fetchJobDetail(id)))

      if (isMounted()) {
        setJobs((prev) => [...prev, ...jobs])
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }, [fetchJobDetail, fetchJobIds, isMounted])

  function hasNext() {
    if (loading) {
      return false
    }

    let totalPages = Math.floor(jobIdsRef.current.length / PAGE_SIZE)
    return totalPages >= pageRef.current
  }

  function loadMore() {
    pageRef.current++
    fetchJobsDetails()
  }

  useEffect(() => {
    fetchJobsDetails()
  }, [fetchJobsDetails])

  return {
    loading,
    hasNext,
    loadMore,
    jobs,
  }
}
