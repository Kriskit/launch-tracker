export interface Launch {
  id: string
  name: string
  net: string
  status: {
    id: number
    name: string
    abbrev: string
  }
  launch_service_provider: {
    name: string
  }
  rocket: {
    configuration: {
      full_name: string
    }
  }
  mission: {
    name: string
    description: string
    orbit: {
      name: string
    } | null
  } | null
  pad: {
    name: string
    location: {
      name: string
    }
  }
  image: string | null
}

export interface LaunchResponse {
  count: number
  results: Launch[]
}
