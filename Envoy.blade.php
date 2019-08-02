@setup
    ##TODO: provide path variables through file instead of parameters or hardcoded values
    $serverProv = isset($serverProvider) && in_array(strtolower($serverProvider), ['nginx','apache']) ? $serverProvider : 'nginx';
    $appDir = '/var/www/nextApp';
    $releasesDir = $appDir.'/releases';
    $latestRelease = date('Y-m-d-H--i--s');
    $latestReleaseZip = $latestRelease.'.zip';
    $latestReleaseDirectory = $releasesDir .'/'. $latestRelease;
    if (!isset($server)) {
        throw new Exception('Need the server IP to run this script');
    }
    if (!isset($publicKeyPath)) {
        throw new Exception('Need the publicKey path to run this script');
    }
@endsetup

@servers(['web' => $server, 'localhost' => '127.0.0.1'])

@task('build', ['on' => 'localhost'])
    echo '>>> building new app release'
    yarn build
@endtask

@task('compress', ['on' => 'localhost'])
    echo '>>> compressing build'
    sudo zip -r {{ $latestRelease }} .next static package.json server routes.js > /dev/null 2>&1
@endtask

@task('ship', ['on' => 'localhost'])
    echo '>>> shipping build to {{$server}}'
    sudo scp -r -i {{$publicKeyPath}} {{ $latestReleaseZip }} ubuntu{{'@'.$server}}:/var/www/nextApp/releases
    echo '>>> build file is on the server!'
    sudo rm *.zip
@endtask

@task('setRemote', ['on' => 'web'])
    echo '>>> setting remote build'
    cd {{$releasesDir}}
    mkdir {{$latestRelease}}
    sudo unzip {{$latestReleaseZip}} -d {{$latestRelease}}  > /dev/null 2>&1
    cd {{$latestRelease}}
    yarn install > /dev/null 2>&1
    cd
    rm {{$appDir}}/static
    ln -s {{$latestReleaseDirectory}}/static {{$appDir}}
@endtask

@task('startNodeCluster', ['on' => 'web'])
    echo '>>> re-starting node instances'
    cp {{ $appDir }}/ecosystem.config.js {{$latestReleaseDirectory}}/ecosystem.config.js
    cd {{$latestReleaseDirectory}}
    sudo pm2 kill
    sudo pm2 start ecosystem.config.js > /dev/null 2>&1
    cd
    echo '>>> server info:'
    sleep 5
    sudo netstat -nlp | grep 'node\|nginx'
@endtask

@task('clean', ['on' => 'web'])
    echo '>>> cleaning older releases'
    cd {{$releasesDir}}
    rm *.zip
    ls -t | tail -n +3 | sudo xargs rm -rf --
    cd
@endtask

@task('time', ['on' => 'localhost'])
    date +%Y-%m-%d-%H:%M:%S
@endtask

@task('rollback', ['on' => 'web'])
    cd {{$releasesDir}}
    echo '>>> rolling back to' $(ls -rt | tail -n 2 | head -n 1)
    cd $(ls -rt | tail -n 2 | head -n 1)
    sudo pm2 kill
    sudo pm2 start ecosystem.config.js
    cd ..
    echo '>>> server info:'
    sleep 5
    sudo netstat -nlp | grep 'node\|nginx'
    sudo rm -rf $(ls -t | tail -n 1)
    cd
@endtask

@macro('buildDeploy')
    time
    build
    compress
    ship
    setRemote
    startNodeCluster
    clean
    time
@endmacro

@macro('deploy')
    time
    compress
    ship
    setRemote
    startNodeCluster
    clean
    time
@endmacro
#TODO: add slack notification task



