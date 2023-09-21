int f(vector<int>& edges){
    vector<int> vis(edges.size(),0);
    int maxi=-1;
    int maxiSum=0;
    for(int i=0;i<edges.size();i++){
        if(vis[i]==1) continue;
        int cur=i;
        map<int,int> map;
        while(cur!=-1){
            if(map.find(curr)!=map.end()){
                int n=map.size();
                int ind=map[cur];
                int sum=0;
                for(auto it: map){
                    if(it.first>=ind) sum+=it.second;
                }
                maxiSum=max(sum,maxiSum);
                maxi=max(maxi,n-ind+1);
                break;
            }
            if(vis[cur]==1) break;
            vis[cur]=1;
            map[cur]=map.size()+1;
            cur=edges[cur];
        }
    }
    cout<<maxiSum<<endl;
    return maxi;

}